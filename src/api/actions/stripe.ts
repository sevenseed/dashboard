"use server";
import { createKYCSessionForOwner, getOwnerById } from "@/api/actions/database";
import type { CompanyOwner } from "@/api/interfaces/owners";
import { STRIPE_SK } from "@/config";
import Stripe from "stripe";

if (!STRIPE_SK) throw new Error("STRIPE_SK not found in server actions");

const PRODUCT_KEY = process.env.PRODUCT_KEY_INCORPORATION_REGULAR;
if (!PRODUCT_KEY) throw "Product key not found";

const BACKEND_HOST =
	`${process.env.BACKEND_HOST}` ||
	`https://${process.env.VERCEL_URL}` ||
	"http://127.0.0.1:3000";

const stripe = new Stripe(STRIPE_SK);

export async function createCheckoutSession(customerEmail: string) {
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price: PRODUCT_KEY,
				quantity: 1,
			},
		],
		customer_email: customerEmail,
		customer_creation: "always",
		mode: "payment",
		success_url: `${BACKEND_HOST}/dashboard/identity/verify?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${BACKEND_HOST}/dashboard/payment/cancel?session_id={CHECKOUT_SESSION_ID}`,
		automatic_tax: { enabled: true },
	});

	return session.url;
}

export async function getCheckoutSessionObject(sessionId: string) {
	const session = await stripe.checkout.sessions.retrieve(sessionId);

	return {
		status: session.status,
		customer_email: session.customer_email,
	};
}

export async function expireCheckoutSession(sessionId: string) {
	const session = await getCheckoutSessionObject(sessionId);
	if (session.status === "expired") return { email: session.customer_email };

	await stripe.checkout.sessions.expire(sessionId);
	return { email: session.customer_email };
}

export async function createOrReturnVerificationSession(ownerId: CompanyOwner["id"]) {
	const owner = await getOwnerById(ownerId);
	if (owner.kyc_session_id) {
		// TODO: handle cancelled sessions
		const existingSession = await stripe.identity.verificationSessions.retrieve(
			owner.kyc_session_id,
		);

		return existingSession.url;
	}

	const verificationSession = await stripe.identity.verificationSessions.create({
		type: "document",
		return_url: `${BACKEND_HOST}/dashboard/owner/identity/submitted/${ownerId}`,
	});

	try {
		await createKYCSessionForOwner(ownerId, verificationSession.id);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(error.message);
	}

	return verificationSession.url;
}

export async function getVerificationSessionObject(sessionId: string) {
	const session = await stripe.identity.verificationSessions.retrieve(sessionId);

	return session.status === "requires_input"
		? {
				status: session.status,
				url: session.url,
			}
		: {
				status: session.status,
			};
}
