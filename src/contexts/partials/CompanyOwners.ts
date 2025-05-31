import type { UUID } from "crypto";
import type { CompanyOwner } from "@/api/interfaces/owners";
import { getRandomColor } from "@/utilities";

export type OwnersAction =
	// * "ADD" type takes no parameters on purpose
	| { type: "ADD" }
	| { type: "SET"; owners: CompanyOwner[] }
	| { type: "REMOVE"; id: UUID }
	| { type: "UPDATE"; obj: CompanyOwner };

function newOwnerObject() {
	return {
		id: crypto.randomUUID() as UUID,
		name: "",
		email: "",
		civilStatus: "Single",
		phoneNumber: "",

		addressLine1: "",
		addressLine2: "",
		postalCode: "",
		city: "",
		region: "",
		country: "",

		shares: 0,

		// * for displaying ownership shares
		color: getRandomColor(),
	} as CompanyOwner;
}

export const defaultOwners: CompanyOwner[] = [newOwnerObject()];

export function ownersReducer(state: CompanyOwner[], action: OwnersAction) {
	switch (action.type) {
		case "SET":
			return action.owners;
		case "ADD":
			return [...state, newOwnerObject()];
		case "REMOVE":
			return state.filter((owner) => owner.id !== action.id);
		case "UPDATE":
			const index = state.findIndex((owner) => owner.id === action.obj.id);
			const originalObject = state[index];
			return state.toSpliced(index, 1, Object.assign(originalObject, action.obj));

		default:
			return state;
	}
}
