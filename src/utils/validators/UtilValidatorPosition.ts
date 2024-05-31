import { TypeQueryStringPosition } from "../../types/TypeQueryString";

const latitudeMinimum = -90;
const latitudeMaximum = 90;

const longitudeMinimum = -180;
const longitudeMaximum = 180;

const UtilValidatorPosition = function (latitude: unknown, longitude: unknown): TypeQueryStringPosition | string {
    if (typeof latitude !== "number" || typeof longitude !== "number") {
        return "invalid type for latitude or longitude";
    }
    const isLatitudeValid = (
        Boolean(latitude) &&
        !isNaN(latitude) &&
        isFinite(latitude) &&
        latitude >= latitudeMinimum &&
        latitude <= latitudeMaximum
    );
    if (!isLatitudeValid) {
        return "invalid latitude";
    }
    const isLongitudeValid = (
        Boolean(longitude) &&
        !isNaN(longitude) &&
        isFinite(longitude) &&
        longitude >= longitudeMinimum &&
        longitude <= longitudeMaximum
    );
    if (!isLongitudeValid) {
        return "invalid longitude";
    }
    const newPosition = { latitude, longitude };
    return newPosition;
};

export default UtilValidatorPosition;