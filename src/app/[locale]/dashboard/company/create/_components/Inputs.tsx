"use client";
import {
	type ChangeEvent,
	type PropsWithChildren,
	useCallback,
	useContext,
} from "react";
import clsx from "clsx";
import { NewCompanyContext } from "@/contexts/NewCompanyContext";
import { validateChildrenAsComponent } from "@/api/utility/validate";
import type {
	IDKey,
	FormInputProps,
	MultilineInputProps,
	RadioInputProps,
	OwnerIDKey,
	OwnersFormInputProps,
	HTMLInputProps,
} from "./types";
import type { CompanyOwner } from "@/api/interfaces/owners";

import styles from "../../company.module.css";

// TODO: revamp as HOCs

const RequiredMark = () => (
	<span className={styles.required} title="Please fill out this field">
		required
	</span>
);

export function RadioOption({
	id,
	label,
	value,
	required = false,
}: {
	id: IDKey;
	label: string;
	value: string;
	required?: boolean;
}) {
	const { companyData, setCompanyData } = useContext(NewCompanyContext);

	const onChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setCompanyData({ ...companyData, [id]: event.currentTarget.value });
		},
		[id, companyData, setCompanyData],
	);

	return (
		<label className={styles.inputRadio}>
			<input
				type="radio"
				id={id + value.replaceAll(" ", "")}
				name={id as string}
				value={value}
				onChange={onChange}
				required={required}
				defaultChecked={value === companyData[id]}
			/>
			<span>{label}</span>
		</label>
	);
}

export function OwnersRadioOption({
	owner,
	id,
	label,
	value,
	required = false,
}: {
	owner: CompanyOwner;
	id: keyof CompanyOwner;
	label: string;
	value: string;
	required?: boolean;
}) {
	const { dispatch } = useContext(NewCompanyContext);

	const onChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			dispatch({
				type: "UPDATE",
				obj: { ...owner, [id]: event.currentTarget.value },
			});
		},
		[id, owner, dispatch],
	);

	return (
		<label className={styles.inputRadio}>
			<input
				type="radio"
				id={id + value.replaceAll(" ", "") + owner.id}
				name={(id + owner.id) as string}
				value={value}
				onChange={onChange}
				required={required}
				defaultChecked={value === owner[id]}
			/>
			<span>{label}</span>
		</label>
	);
}

export function OwnersRadioOptionWithSelect({
	owner,
	id,
	label,
	value,
	required = false,
}: {
	owner: CompanyOwner;
	id: keyof CompanyOwner;
	label: string;
	value: string;
	required?: boolean;
}) {
	const { dispatch } = useContext(NewCompanyContext);

	const onChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			dispatch({
				type: "UPDATE",
				obj: { ...owner, [id]: event.currentTarget.value },
			});
		},
		[id, owner, dispatch],
	);

	return (
		<label className={styles.inputRadio}>
			<input
				type="radio"
				id={id + value.replaceAll(" ", "") + owner.id}
				name={(id + owner.id) as string}
				value={value}
				onChange={onChange}
				required={required}
				defaultChecked={value === owner[id]}
			/>
			<span>{label}</span>
		</label>
	);
}

export function SimpleFormInput({
	id,
	label,
	description = "",
	placeholder = "",
	type = "text",
	required = false,
	disabled = false,
	className = "",
	value = undefined,
}: FormInputProps) {
	const { companyData, setCompanyData } = useContext(NewCompanyContext);

	// * nullish coalescence in order to force empty values to display empty
	// * instead of falling back on an available `companyData[id]` value
	// * e.g. with company address
	const inputValue = value ?? companyData[id];

	const onChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if (!Object.hasOwn(companyData, id)) return;
			setCompanyData({ ...companyData, [id]: event.currentTarget.value });
		},
		[id, companyData, setCompanyData],
	);

	return (
		<fieldset className={styles.fieldset} disabled={disabled}>
			<label className={styles.label}>
				<span className={styles.labelText}>
					{label}
					{required && <RequiredMark />}
				</span>
				{description ? (
					<span className={styles.description}>{description}</span>
				) : (
					""
				)}

				<input
					id={id}
					name={id}
					type={type}
					required={required}
					placeholder={placeholder}
					value={inputValue}
					onChange={onChange}
					className={clsx(styles.inputText, className)}
				/>
			</label>
		</fieldset>
	);
}

export function OwnersSimpleFormInput({
	owner,
	id,
	label,
	description = "",
	placeholder = "",
	type = "text",
	required = false,
	disabled = false,
	className = "",
	value = undefined,
}: OwnersFormInputProps & HTMLInputProps & { owner: CompanyOwner }) {
	const { dispatch } = useContext(NewCompanyContext);

	// * nullish coalescence in order to force empty values to display empty
	// * instead of falling back on an available `owner[id]` value
	// * e.g. with company address
	const inputValue = value ?? owner[id];

	const onChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			dispatch({
				type: "UPDATE",
				obj: { ...owner, [id]: event.currentTarget.value },
			});
		},
		[id, owner, dispatch],
	);

	return (
		<fieldset className={styles.fieldset} disabled={disabled}>
			<label className={styles.label}>
				<span className={styles.labelText}>
					{label}
					{required && <RequiredMark />}
				</span>
				{description ? (
					<span className={styles.description}>{description}</span>
				) : (
					""
				)}

				<input
					id={`${id}-${owner.id}`}
					name={id}
					type={type}
					required={required}
					placeholder={placeholder}
					value={inputValue}
					onChange={onChange}
					className={clsx(styles.inputText, className)}
				/>
			</label>
		</fieldset>
	);
}

export function MultilineFormInput({
	id,
	label,
	description = "",
	placeholder = "",
	rows = 2,
	cols = 1,
	required = false,
}: MultilineInputProps) {
	const { companyData, setCompanyData } = useContext(NewCompanyContext);

	const value = companyData[id];

	const onChange = useCallback(
		(event: ChangeEvent<HTMLTextAreaElement>) => {
			setCompanyData({ ...companyData, [id]: event.currentTarget.value });
		},
		[id, companyData, setCompanyData],
	);

	return (
		<fieldset className={styles.fieldset}>
			<label className={styles.label}>
				<span className={styles.labelText}>
					{label}
					{required ? <RequiredMark /> : ""}
				</span>
				{description ? (
					<span className={styles.description}>{description}</span>
				) : (
					""
				)}
				<textarea
					id={id}
					name={id}
					required={required}
					placeholder={placeholder}
					className={styles.inputText}
					value={value}
					onChange={onChange}
					rows={rows}
					cols={cols}
				/>
			</label>
		</fieldset>
	);
}

export function RadioFormInput({
	label = "",
	required = false,
	children,
}: RadioInputProps & PropsWithChildren) {
	/* const hasCorrectChildren =
		validateChildrenAsComponent(children, RadioOption)

	if (!hasCorrectChildren) {
		throw new Error(
			"Children of a <RadioFormInput /> should only be <RadioOption />",
		);
	} */

	return (
		<fieldset className={styles.fieldset}>
			{label ? (
				<span className={styles.labelText}>
					{label}
					{required && <RequiredMark />}
				</span>
			) : (
				""
			)}
			<div className={styles.inputRadioContainer}>{children}</div>
		</fieldset>
	);
}

export function OwnersRadioFormInput({
	label = "",
	required = false,
	children,
}: OwnersFormInputProps & HTMLInputProps & PropsWithChildren) {
	/* const hasCorrectChildren =
		validateChildrenAsComponent(children, OwnersRadioOption) ||
		validateChildrenAsComponent(children, OwnersRadioOptionWithSelect);

	if (!hasCorrectChildren) {
		throw new Error(
			"Children of a <OwnersRadioFormInput /> should only be <OwnersRadioOption /> or <OwnersRadioOptionWithSelect />",
		);
	} */

	return (
		<fieldset className={styles.fieldset}>
			{label ? (
				<span className={styles.labelText}>
					{label}
					{required && <RequiredMark />}
				</span>
			) : (
				""
			)}
			<div className={styles.inputRadioContainer}>{children}</div>
		</fieldset>
	);
}
