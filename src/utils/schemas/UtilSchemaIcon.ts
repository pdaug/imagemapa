import { URLSearchParams } from "node:url";

import type { TypeQueryStringIcon } from "../../types/TypeQueryString";
import type { TypeGenericObjectOptionalValues } from "../../types/TypeGeneric";

import UtilValidatorSize from "../validators/UtilValidatorSize";
import UtilValidatorZoom from "../validators/UtilValidatorZoom";
import UtilValidatorFormat from "../validators/UtilValidatorFormat";
import UtilValidatorQuality from "../validators/UtilValidatorQuality";
import UtilValidatorPosition from "../validators/UtilValidatorPosition";

const UtilSchemaIconNormalize = function (queries: TypeGenericObjectOptionalValues): TypeQueryStringIcon | string {
    const position = UtilValidatorPosition(queries.lat, queries.lng);
    if (typeof position === "string") {
        return position;
    }
    const { latitude, longitude } = position;
    const icon = queries.icon;
    const zoom = UtilValidatorZoom(queries.z);
    const format = UtilValidatorFormat(queries.f) ? queries.f : "jpg";
    const size = UtilValidatorSize(queries.s, 64, 8, 256);
    const quality = UtilValidatorQuality(queries.q);
    const width = UtilValidatorSize(queries.w, 640);
    const height = UtilValidatorSize(queries.h, 480);
    const queryString: TypeQueryStringIcon = {
        latitude,
        longitude,
        icon,
        size,
        zoom,
        format,
        quality,
        width,
        height,
    };
    return queryString;
};

const UtilSchemaIconList = [ "lat", "lng", "icon", "s", "z", "f", "q", "w", "h" ];

const UtilSchemaIcon = function (url: string, route: string): TypeQueryStringIcon | string {
    const currentUrl = url.replaceAll(route, "");
    const currentUrlQueries = new URLSearchParams(currentUrl);
    const queries = new Object() as TypeGenericObjectOptionalValues;
    for (const query of UtilSchemaIconList) {
        queries[query] = currentUrlQueries.get(query);
    }
    const queryString = UtilSchemaIconNormalize(queries);
    return queryString;
};

export default UtilSchemaIcon;