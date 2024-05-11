import { URLSearchParams } from "node:url";

import type { TypeQueryStringRoute } from "../../types/TypeQueryString";
import type { TypeGenericObjectOptionalValues } from "../../types/TypeGeneric";

import UtilValidatorSize from "../validators/UtilValidatorSize";
import UtilValidatorColor from "../validators/UtilValidatorColor";
import UtilValidatorPoint from "../validators/UtilValidatorPoint";
import UtilValidatorFormat from "../validators/UtilValidatorFormat";
import UtilValidatorQuality from "../validators/UtilValidatorQuality";
import UtilFunctionPosition from "../functions/UtilFunctionPosition";

const UtilSchemaRouteNormalize = function (queries: TypeGenericObjectOptionalValues): TypeQueryStringRoute | null {
    const positions = UtilFunctionPosition(queries.pos);
    if (!positions) {
        return null;
    }
    const pointA = UtilValidatorPoint(queries.a, "A");
    const pointB = UtilValidatorPoint(queries.b, "B");
    const color = UtilValidatorColor(queries.c, "#000");
    const format = UtilValidatorFormat(queries.f) ? queries.f : "jpg";
    const quality = UtilValidatorQuality(queries.q);
    const width = UtilValidatorSize(queries.w, 640);
    const height = UtilValidatorSize(queries.h, 480);
    const queryString: TypeQueryStringRoute = {
        positions,
        pointA,
        pointB,
        color,
        format,
        quality,
        height,
        width
    };
    return queryString;
};

const UtilSchemaRouteList = [ "pos", "a", "b", "c", "f", "q", "h", "w" ];

const UtilSchemaRoute = function (url: string, route: string): TypeQueryStringRoute | null {
    const currentUrl = url.replaceAll(route, "");
    const currentUrlQueries = new URLSearchParams(currentUrl);
    const queries = new Object() as TypeGenericObjectOptionalValues;
    for (const field of UtilSchemaRouteList) {
        queries[field] = currentUrlQueries.get(field);
    }
    const queryString = UtilSchemaRouteNormalize(queries);
    return queryString;
};

export default UtilSchemaRoute;