import { URLSearchParams } from "node:url";

import type { TypeQueryStringPosition } from "../../types/TypeQueryString";
import type { TypeGenericObjectOptionalValues } from "../../types/TypeGeneric";

import UtilValidatorPosition from "../validators/UtilValidatorPosition";

const UtilSchemaAddressNormalize = function (queries: TypeGenericObjectOptionalValues): TypeQueryStringPosition | string {
    const position = UtilValidatorPosition(queries.lat, queries.lng);
    if (typeof position === "string") {
        return position;
    }
    const { latitude, longitude } = position;
    const queryString: TypeQueryStringPosition = {
        latitude,
        longitude,
    };
    return queryString;
};

const UtilSchemaAddressList = [ "lat", "lng" ];

const UtilSchemaAddress = function (url: string, route: string): TypeQueryStringPosition | string {
    const currentUrl = url.replaceAll(route, "");
    const currentUrlQueries = new URLSearchParams(currentUrl);
    const queries = new Object() as TypeGenericObjectOptionalValues;
    for (const query of UtilSchemaAddressList) {
        queries[query] = currentUrlQueries.get(query);
    }
    const queryString = UtilSchemaAddressNormalize(queries);
    return queryString;
};

export default UtilSchemaAddress;