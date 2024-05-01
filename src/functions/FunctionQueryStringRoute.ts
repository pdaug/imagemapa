import { URLSearchParams } from "node:url";

import type { TypeQueryStringRoute } from "../types/TypeQueryString";
import type { TypeGenericObjectOptionalValues } from "../types/TypeGeneric";

import FunctionNormalizeSize from "./FunctionNormalizeSize";
import FunctionNormalizeColor from "./FunctionNormalizeColor";
import FunctionNormalizePoint from "./FunctionNormalizePoint";
import FunctionNormalizeFormat from "./FunctionNormalizeFormat";
import FunctionNormalizeQuality from "./FunctionNormalizeQuality";
import FunctionTransformPositions from "./FunctionTransformPositions";

const FunctionQueryStringRouteNormalize = function (queries: TypeGenericObjectOptionalValues): TypeQueryStringRoute | null {
    const positions = FunctionTransformPositions(queries.pos);
    if (!positions) {
        return null;
    }
    const pointA = FunctionNormalizePoint(queries.a, "A");
    const pointB = FunctionNormalizePoint(queries.b, "B");
    const color = FunctionNormalizeColor(queries.c, "#000");
    const format = FunctionNormalizeFormat(queries.f) ? queries.f : "jpg";
    const quality = FunctionNormalizeQuality(queries.q);
    const width = FunctionNormalizeSize(queries.w, 640);
    const height = FunctionNormalizeSize(queries.h, 480);
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

const FunctionQueryStringRouteList = [ "pos", "a", "b", "c", "f", "q", "h", "w" ];

const FunctionQueryStringRoute = function (url: string, route: string): TypeQueryStringRoute | null {
    const currentUrl = url.replaceAll(route, "");
    const currentUrlQueries = new URLSearchParams(currentUrl);
    const queries = new Object() as TypeGenericObjectOptionalValues;
    for (const field of FunctionQueryStringRouteList) {
        queries[field] = currentUrlQueries.get(field);
    }
    const queryString = FunctionQueryStringRouteNormalize(queries);
    return queryString;
};

export default FunctionQueryStringRoute;