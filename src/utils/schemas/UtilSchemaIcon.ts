import type { TypeGenericObject } from "../../types/TypeGeneric";
import type { TypeQueryStringIcon } from "../../types/TypeQueryString";

import UtilValidatorSize from "../validators/UtilValidatorSize";
import UtilValidatorZoom from "../validators/UtilValidatorZoom";
import UtilValidatorFormat from "../validators/UtilValidatorFormat";
import UtilValidatorQuality from "../validators/UtilValidatorQuality";
import UtilValidatorPosition from "../validators/UtilValidatorPosition";

const UtilSchemaIcon = function (queries: TypeGenericObject): TypeQueryStringIcon | string {
    const position = UtilValidatorPosition(queries.lat, queries.lng);
    if (typeof position === "string") {
        return position;
    }
    const { latitude, longitude } = position;
    const icon = queries.icon;
    if (!icon || typeof icon !== "string") {
        return "icon not found"
    }
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

export default UtilSchemaIcon;