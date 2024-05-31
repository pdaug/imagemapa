import type { TypeGenericObject } from "../../types/TypeGeneric";
import type { TypeQueryStringPosition } from "../../types/TypeQueryString";

import UtilValidatorPosition from "../validators/UtilValidatorPosition";

const UtilSchemaAddress = function (queries: TypeGenericObject): TypeQueryStringPosition | string {
    const position = UtilValidatorPosition(queries.lat, queries.lng);
    if (typeof position === "string") {
        return position;
    }
    const { latitude, longitude } = position;
    const queryObject: TypeQueryStringPosition = { latitude, longitude };
    return queryObject;
};

export default UtilSchemaAddress;