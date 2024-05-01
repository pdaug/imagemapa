import { URLSearchParams } from "node:url";

import type { TypeQueryStringIcon } from "../types/TypeQueryString";
import type { TypeGenericObjectOptionalValues } from "../types/TypeGeneric";

import FunctionNormalizeSize from "./FunctionNormalizeSize";
import FunctionNormalizeZoom from "./FunctionNormalizeZoom";
import FunctionNormalizeFormat from "./FunctionNormalizeFormat";
import FunctionNormalizeQuality from "./FunctionNormalizeQuality";
import FunctionNormalizePosition from "./FunctionNormalizePosition";

const FunctionQueryStringIconNormalize = function (queries: TypeGenericObjectOptionalValues): TypeQueryStringIcon | null {
    const position = FunctionNormalizePosition(queries.lat, queries.lng);
    if (!position) {
        return null;
    }
    const { latitude, longitude } = position;
    const icon = queries.icon;
    const zoom = FunctionNormalizeZoom(queries.z);
    const format = FunctionNormalizeFormat(queries.f) ? queries.f : "jpg";
    const size = FunctionNormalizeSize(queries.s, 64, 8, 256);
    const quality = FunctionNormalizeQuality(queries.q);
    const width = FunctionNormalizeSize(queries.w, 640);
    const height = FunctionNormalizeSize(queries.h, 480);
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

const FunctionQueryStringIconList = [ "lat", "lng", "icon", "s", "z", "f", "q", "w", "h" ];

const FunctionQueryStringIcon = function (url: string, route: string): TypeQueryStringIcon | null {
    const currentUrl = url.replaceAll(route, "");
    const currentUrlQueries = new URLSearchParams(currentUrl);
    const queries = new Object() as TypeGenericObjectOptionalValues;
    for (const query of FunctionQueryStringIconList) {
        queries[query] = currentUrlQueries.get(query);
    }
    const queryString = FunctionQueryStringIconNormalize(queries);
    return queryString;
};

export default FunctionQueryStringIcon;