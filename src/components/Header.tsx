"use client";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { GridPattern } from "./GridPattern";
import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";
import Image from "next/image";
import logo from "@/images/logo.svg";
const navigation = [
	{ name: "Contact", href: "/contact" },
	{
		name: "Our Team",
		href: "/team",
	},
];

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<>
			<nav
				className="mx-auto flex w-full max-w-7xl items-center justify-between p-6 lg:px-8"
				aria-label="Global"
			>
				<GridPattern
					patternTransform="translate(0 80)"
					className="text-slate-900/10 w-full inset-0 absolute pointer-events-none"
				/>
				<a href="/" className="-m-1.5 p-1.5">
					<span className="sr-only">Seven Seed</span>
					<Image className="h-12 w-auto" src={logo} alt="" />
				</a>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<div className="hidden lg:flex lg:gap-x-12 items-center">
					<LanguageSwitcher />
					{navigation.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className="text-sm font-semibold leading-6 text-gray-900"
						>
							{item.name}
						</a>
					))}
					<Link
						href="/signup"
						className="text-sm font-semibold leading-6 inline-flex justify-center rounded-md py-1 px-4 tracking-tight shadow-sm focus:outline-none bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:bg-blue-700 active:text-white/80"
					>
						Get started <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</nav>
			<Dialog
				as="div"
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className="fixed inset-0 z-10" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<a href="/" className="-m-1.5 p-1.5">
							<span className="sr-only">Seven Seed</span>
							<Image className="h-12 w-auto" src={logo} alt="" />
						</a>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>
										{item.name}
									</a>
								))}
							</div>
							<div className="py-6">
								<a
									href="/login"
									className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Log in
								</a>
							</div>
							<LanguageSwitcher />
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</>
	);
};

export default Header;
