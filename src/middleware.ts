import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { createClient } from "@/supabase/server";
import locales from "@/locales";

export const intlResponse = (request: NextRequest) => {
	const url = new URL(request.url);
	console.log(url.pathname);
	if (url.pathname.startsWith("/images") || url.pathname.startsWith("/_next")) {
		return null;
	}
	const lang = url.searchParams.get("lang");
	if (lang) {
		request.cookies.set("NEXT_LOCALE", lang);
	}
	const handleI18nRouting = createIntlMiddleware({
		locales: locales,
		defaultLocale: "en",
		localePrefix: "never",
	});
	const res = handleI18nRouting(request);
	if (lang) {
		res.cookies.set("NEXT_LOCALE", lang);
	}
	return res;
};

const middleware = async (request: NextRequest) => {
	const response = intlResponse(request) ?? NextResponse.next();
	request.headers.set("x-url", request.url);

	const supabase = createClient();

	await supabase.auth.getSession();

	response.headers.set("x-url", request.url);

	return response;
};

export default middleware;
