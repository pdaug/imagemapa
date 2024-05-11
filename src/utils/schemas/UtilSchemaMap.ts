import { URLSearchParams } from "node:url";

import type { TypeQueryStringMap } from "../../types/TypeQueryString";
import type { TypeGenericObjectOptionalValues } from "../../types/TypeGeneric";

import UtilValidatorSize from "../validators/UtilValidatorSize";
import UtilValidatorZoom from "../validators/UtilValidatorZoom";
import UtilValidatorFormat from "../validators/UtilValidatorFormat";
import UtilValidatorQuality from "../validators/UtilValidatorQuality";
import UtilValidatorPosition from "../validators/UtilValidatorPosition";

const UtilSchemaMapNormalize = function (queries: TypeGenericObjectOptionalValues): TypeQueryStringMap | null {
    const position = UtilValidatorPosition(queries.lat, queries.lng);
    if (!position) {
        return null;
    }
    const { latitude, longitude } = position;
    const zoom = UtilValidatorZoom(queries.z);
    const format = UtilValidatorFormat(queries.f) ? queries.f : "jpg";
    const quality = UtilValidatorQuality(queries.q);
    const width = UtilValidatorSize(queries.w, 640);
    const height = UtilValidatorSize(queries.h, 480);
    const queryString: TypeQueryStringMap = {
        latitude,
        longitude,
        zoom,
        format,
        quality,
        width,
        height,
    };
    return queryString;
};

const UtilSchemaMapList = [ "lat", "lng", "z", "f", "q", "w", "h" ];

const UtilSchemaMap = function (url: string, route: string): TypeQueryStringMap | null {
    const currentUrl = url.replaceAll(route, "");
    const currentUrlQueries = new URLSearchParams(currentUrl);
    const queries = new Object() as TypeGenericObjectOptionalValues;
    for (const query of UtilSchemaMapList) {
        queries[query] = currentUrlQueries.get(query);
    }
    const queryString = UtilSchemaMapNormalize(queries);
    return queryString;
};

export default UtilSchemaMap;