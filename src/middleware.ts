import locales from "@/locales";
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

export const intlResponse = (request: NextRequest) => {
	const url = new URL(request.url);
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
	return response;
};

export default middleware;
