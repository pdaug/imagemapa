import ConfigLeaflet from "../../config/ConfigLeaflet";

import { TypeGenericObject } from "../../types/TypeGeneric";
import type { TypeQueryStringRoute } from "../../types/TypeQueryString";

import UtilValidatorSize from "../validators/UtilValidatorSize";
import UtilValidatorColor from "../validators/UtilValidatorColor";
import UtilValidatorPoint from "../validators/UtilValidatorPoint";
import UtilValidatorFormat from "../validators/UtilValidatorFormat";
import UtilValidatorQuality from "../validators/UtilValidatorQuality";
import UtilFunctionPosition from "../functions/UtilFunctionPosition";

const UtilSchemaRoute = function (queries: TypeGenericObject): TypeQueryStringRoute | string {
    const positions = UtilFunctionPosition(queries.pos);
    if (typeof positions === "string") {
        return positions;
    }
    const pointA = UtilValidatorPoint(queries.a, ConfigLeaflet.pointA);
    const pointB = UtilValidatorPoint(queries.b, ConfigLeaflet.pointB);
    const color = UtilValidatorColor(queries.c, ConfigLeaflet.colorDefault);
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

export default UtilSchemaRoute;