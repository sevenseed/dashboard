import { Container } from "@/components/Container";
import EmailLink from "@/components/EmailLink";
import { GridPattern } from "@/components/GridPattern";
import Link from "next/link";

const WaitlistPage = () => (
	<div className="relative flex flex-auto items-center">
		<div className="absolute inset-0 -z-10 text-slate-900/10 [mask-image:linear-gradient(transparent,white,transparent)]">
			<GridPattern x="50%" y="50%" patternTransform="translate(0 60)" />
		</div>
		<Container className="flex flex-col items-center py-16 text-center sm:py-20 lg:py-32">
			<h1 className="mt-6 font-display text-5xl font-extrabold text-slate-900 sm:text-6xl">
				Seven Seed is in private beta
			</h1>
			<p className="mt-4 text-lg tracking-tight text-slate-700">
				We are currently in private beta and only accept a limited number of new
				customers. Please complete our form or send us an email at{" "}
				<EmailLink email="contact@sevenseed.eu" /> with a description of your
				company, we will respond as soon as possible.
			</p>
			<Link
				href="https://share-eu1.hsforms.com/1nvcARfYkQdCpeDXUrZblKg2dapz2"
				target="_blank"
				className="mt-6 text-base font-medium text-blue-600 hover:text-blue-800"
			>
				Contact us <span aria-hidden="true">&rarr;</span>
			</Link>
		</Container>
	</div>
);

export default WaitlistPage;
