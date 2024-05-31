import type { TypeGenericObject } from "../../types/TypeGeneric";
import type { TypeQueryStringStreet } from "../../types/TypeQueryString";

import UtilValidatorTilt from "../validators/UtilValidatorTilt";
import UtilValidatorAngle from "../validators/UtilValidatorAngle";
import UtilValidatorPosition from "../validators/UtilValidatorPosition";

const UtilSchemaStreet = function (queries: TypeGenericObject): TypeQueryStringStreet | string {
    const position = UtilValidatorPosition(queries.lat, queries.lng);
    if (typeof position === "string") {
        return position;
    }
    const { latitude, longitude } = position;
    const bearing = UtilValidatorAngle(queries.b);
    const tilt = UtilValidatorTilt(queries.t);
    const pitch = UtilValidatorTilt(queries.p);
    const queryString: TypeQueryStringStreet = {
        latitude,
        longitude,
        bearing,
        tilt,
        pitch,
    };
    return queryString;
};

export default UtilSchemaStreet;