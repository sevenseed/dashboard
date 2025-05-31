import type { CompanyOwner } from "@/api/interfaces/owners";
import { getRandomColor } from "@/utilities";
import type { UUID } from "crypto";

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
			// eslint-disable-next-line no-case-declarations
			const index = state.findIndex((owner) => owner.id === action.obj.id);
			return state.toSpliced(index, 1, Object.assign(state[index], action.obj));

		default:
			return state;
	}
}
