import { useContext, useMemo } from "react";
import FormPage from "../_components/FormPage";
import { RadioFormInput, RadioOption, SimpleFormInput } from "../_components/Inputs";
import { NewCompanyContext } from "@/contexts/NewCompanyContext";
import { getOwnerObjectById } from "@/api/utility/get";
import type { UUID } from "crypto";

import styles from "./pages.module.css";

export default function CompanyAddressPage() {
	const { companyData, setCompanyData, owners } = useContext(NewCompanyContext);
	const usesExistingAddress = companyData.addressType === "ExistingAddress";
	const usesHomeAddress = companyData.addressType === "HomeAddress";

	// TODO: come up with a straightforward solution to updating contact owner information without recomputing `contactOwner` on every change in `owners`
	const contactOwner = useMemo(() => {
		return getOwnerObjectById(owners, companyData.addressSource);
	}, [owners, companyData.addressSource]);

	return (
		<div className={styles.pageWrapper}>
			<FormPage step="companyAddress" label="Company Address">
				<RadioFormInput id="addressType">
					<div className="w-full flex sm:flex-row flex-col gap-x-2">
						<RadioOption
							id="addressType"
							label="Use home address of"
							value="HomeAddress"
							required
						/>
						<select
							className="flex-1 -mt-2 sm:mt-0 ml-4 sm:ml-0 border rounded disabled:bg-zinc-100"
							name="addressSource"
							id="addressSource"
							value={companyData.addressSource ?? ""}
							onChange={(event) => {
								const addressSource = event.currentTarget.value as UUID;
								setCompanyData({
									...companyData,
									addressSource,
								});
							}}
							disabled={!usesHomeAddress}
						>
							{owners.length ? (
								owners.map((owner) => (
									<option key={owner.id} value={owner.id}>
										{owner.name || "an unnamed owner"}
									</option>
								))
							) : (
								<option>one of the owners</option>
							)}
						</select>
					</div>
					<RadioOption
						id="addressType"
						label="Get me an address"
						value="CreateNewAddress"
						required
					/>
					<RadioOption
						id="addressType"
						label="Use an existing address"
						value="ExistingAddress"
						required
					/>
				</RadioFormInput>
				<SimpleFormInput
					id="addressLine1"
					label="Address line 1"
					placeholder="Rue de la Loi, 123"
					value={
						usesExistingAddress
							? companyData.addressLine1
							: usesHomeAddress
								? contactOwner?.addressLine1
								: ""
					}
					required={usesExistingAddress}
					disabled={!usesExistingAddress}
				/>
				<SimpleFormInput
					id="addressLine2"
					label="Address line 2"
					placeholder="Apt 123"
					value={
						usesExistingAddress
							? companyData.addressLine2
							: usesHomeAddress
								? contactOwner?.addressLine2
								: ""
					}
					disabled={!usesExistingAddress}
				/>
				<div className="flex-wrap sm:flex-nowrap gap-x-2 gap-y-1 grid sm:grid-cols-[1fr_3fr]">
					<SimpleFormInput
						id="postalCode"
						label="Postal code"
						placeholder="1040"
						className="sm:max-w-[10ch]"
						value={
							usesExistingAddress
								? companyData.postalCode
								: usesHomeAddress
									? contactOwner?.postalCode
									: ""
						}
						disabled={!usesExistingAddress}
					/>
					<SimpleFormInput
						id="city"
						label="City"
						placeholder="Brussels"
						value={
							usesExistingAddress
								? companyData.city
								: usesHomeAddress
									? contactOwner?.city
									: ""
						}
						required={usesExistingAddress}
						disabled={!usesExistingAddress}
					/>
				</div>
				<SimpleFormInput
					id="region"
					label="State / Province / Region"
					placeholder="Brussels-Capital Region"
					value={
						usesExistingAddress
							? companyData.region
							: usesHomeAddress
								? contactOwner?.region
								: ""
					}
					disabled={!usesExistingAddress}
				/>
				<SimpleFormInput
					id="country"
					label="Country"
					placeholder="Belgium"
					value={
						usesExistingAddress
							? companyData.country
							: usesHomeAddress
								? contactOwner?.country
								: ""
					}
					required={usesExistingAddress}
					disabled={!usesExistingAddress}
				/>
			</FormPage>
		</div>
	);
}
