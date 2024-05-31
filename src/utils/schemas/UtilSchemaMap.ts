import type { TypeGenericObject } from "../../types/TypeGeneric";
import type { TypeQueryStringMap } from "../../types/TypeQueryString";

import UtilValidatorSize from "../validators/UtilValidatorSize";
import UtilValidatorZoom from "../validators/UtilValidatorZoom";
import UtilValidatorFormat from "../validators/UtilValidatorFormat";
import UtilValidatorQuality from "../validators/UtilValidatorQuality";
import UtilValidatorPosition from "../validators/UtilValidatorPosition";

const UtilSchemaMap = function (queries: TypeGenericObject): TypeQueryStringMap | string {
    const position = UtilValidatorPosition(queries.lat, queries.lng);
    if (typeof position === "string") {
        return position;
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

export default UtilSchemaMap;