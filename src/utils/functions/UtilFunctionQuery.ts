import { URLSearchParams } from "node:url";

import type { TypeGenericObject } from "../../types/TypeGeneric";

const UtilFunctionQuery = function (url: string, route: string): TypeGenericObject | string {
    if (!url) {
        return "invalid url";
    }
    if (!route) {
        return "invalid route";
    }
    try {
        const queryUrl = url.replaceAll(route, "");
        const queryFormatted = new URLSearchParams(queryUrl);
        if (queryFormatted.size === 0) {
            return "does not has queries";
        }
        const queries = new Object() as TypeGenericObject;
        for (const queryKey of queryFormatted.keys()) {
            const queryValue = queryFormatted.get(queryKey);
            try {
                queries[queryKey] = JSON.parse(queryValue);
            } catch {
                queries[queryKey] = queryValue;
            }
        }
        return queries;
    }
    catch (error) {
        console.error(error);
        return "error in get queries";
    } 
};

export default UtilFunctionQuery;