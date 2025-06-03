"use client";

import {
	Children,
	ComponentPropsWithoutRef,
	ReactNode,
	createContext,
	useContext,
	useState,
} from "react";

function ArrowDownIcon(props: ComponentPropsWithoutRef<"svg">) {
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
			<path
				d="m17 14-5 5-5-5M12 18.5V5"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

const ExpandableContext = createContext({
	isExpanded: false,
	expand: () => {},
});

export function Expandable(props: ComponentPropsWithoutRef<"div">) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<ExpandableContext.Provider
			value={{
				isExpanded,
				expand: () => {
					setIsExpanded(true);
				},
			}}
		>
			<div {...props} data-expanded={isExpanded ? "" : undefined} />
		</ExpandableContext.Provider>
	);
}

export function ExpandableItems({
	children,
	limit = 2,
}: {
	children: ReactNode;
	limit?: number;
}) {
	const { isExpanded } = useContext(ExpandableContext);

	return Children.toArray(children).slice(0, isExpanded ? undefined : limit);
}

export function ExpandableButton({ children }: { children: ReactNode }) {
	const { isExpanded, expand } = useContext(ExpandableContext);

	return (
		!isExpanded && (
			<div className="mt-10 flex justify-center">
				<button
					type="button"
					className="flex items-center text-base font-medium tracking-tight text-slate-900 hover:text-slate-700"
					onClick={expand}
				>
					{children}
					<ArrowDownIcon className="ml-2 h-6 w-6" />
				</button>
			</div>
		)
	);
}
