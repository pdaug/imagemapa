import { URLSearchParams } from "node:url";

import type { TypeQueryStringMap } from "../types/TypeQueryString";
import type { TypeGenericObjectOptionalValues } from "../types/TypeGeneric";

import FunctionNormalizeSize from "./FunctionNormalizeSize";
import FunctionNormalizeZoom from "./FunctionNormalizeZoom";
import FunctionNormalizeFormat from "./FunctionNormalizeFormat";
import FunctionNormalizeQuality from "./FunctionNormalizeQuality";
import FunctionNormalizePosition from "./FunctionNormalizePosition";

const FunctionQueryStringMapNormalize = function (queries: TypeGenericObjectOptionalValues): TypeQueryStringMap | null {
    const position = FunctionNormalizePosition(queries.lat, queries.lng);
    if (!position) {
        return null;
    }
    const { latitude, longitude } = position;
    const zoom = FunctionNormalizeZoom(queries.z);
    const format = FunctionNormalizeFormat(queries.f) ? queries.f : "jpg";
    const quality = FunctionNormalizeQuality(queries.q);
    const width = FunctionNormalizeSize(queries.w, 640);
    const height = FunctionNormalizeSize(queries.h, 480);
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

const FunctionQueryStringMapList = [ "lat", "lng", "z", "f", "q", "w", "h" ];

const FunctionQueryStringMap = function (url: string, route: string): TypeQueryStringMap | null {
    const currentUrl = url.replaceAll(route, "");
    const currentUrlQueries = new URLSearchParams(currentUrl);
    const queries = new Object() as TypeGenericObjectOptionalValues;
    for (const query of FunctionQueryStringMapList) {
        queries[query] = currentUrlQueries.get(query);
    }
    const queryString = FunctionQueryStringMapNormalize(queries);
    return queryString;
};

export default FunctionQueryStringMap;