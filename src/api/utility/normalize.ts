import * as changeKeys from "change-case/keys";
import omit from "just-omit";

function normalizeObjectForDatabase(
	// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
	obj: Object,
	omitKeys: Array<keyof typeof obj> = [],
) {
	return changeKeys.snakeCase(omitKeys.length ? omit(obj, omitKeys) : obj);
}

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
function normalizeObjectForApp(obj: Object, omitKeys: Array<keyof typeof obj> = []) {
	return changeKeys.camelCase(omitKeys.length ? omit(obj, omitKeys) : obj);
}

export { normalizeObjectForApp, normalizeObjectForDatabase };
