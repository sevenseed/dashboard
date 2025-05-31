export type Nullable<T> = T | null;
export type NullableString = Nullable<string>;

export type KeyArray<T> = Array<keyof T>;

export interface GenericObject {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string | number]: any;
}

export type Email = `${string}@${string}.${string}` | "";
export type CivilStatus = "Single" | "Married" | "Legal Cohabitation";
export type AddressType = "HomeAddress" | "CreateNewAddress" | "ExistingAddress";
