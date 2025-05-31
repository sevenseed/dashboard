import Footer from "@/components/layout/Footer";
import { PropsWithChildren } from "react";

export default function PrivacyLayout({ children }: PropsWithChildren) {
	return (
		<>
			{children}
			<Footer />
		</>
	);
}
