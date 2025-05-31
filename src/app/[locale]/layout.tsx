import clsx from "clsx";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import "@/styles/tailwind.css";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: "Seven Seed - Launch Your Startup in Europe",
	description:
		"Join a six month tech startup incubation program. Apply before July 1st for the next cohort.",
};

const RootLayout = ({ children }: PropsWithChildren) => {
	return (
		<html
			lang="en"
			className={clsx(
				"h-full scroll-smooth bg-white antialiased",
				inter.variable,
			)}
		>
			<head>
				<link
					rel="preconnect"
					href="https://cdn.fontshare.com"
					crossOrigin="anonymous"
				/>
				<link
					rel="stylesheet"
					href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,700&display=swap"
				/>

				{/* --- Open Graph Meta Tags --- */}
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content="Seven Seed - Launch Your Startup in Europe"
				/>
				<meta
					property="og:description"
					content="Join a six month tech startup incubation program. Apply before July 1st for the next cohort."
				/>
				<meta property="og:url" content="https://sevenseed.eu/" />
				<meta
					property="og:image"
					content="https://sevenseed.eu/images/sevenseed-og.png"
				/>
				<meta property="og:site_name" content="Seven Seed" />
			</head>
			<body className="flex min-h-full flex-col">
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
};

export default RootLayout;
