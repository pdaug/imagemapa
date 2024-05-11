import { TypeQueryStringPosition } from "../../types/TypeQueryString";

const latitudeMinimum = -90;
const latitudeMaximum = 90;

const longitudeMinimum = -180;
const longitudeMaximum = 180;

const UtilValidatorPosition = function (latitude: string, longitude: string): TypeQueryStringPosition | string {
    const latitudeParsed = parseFloat(latitude);
    const longitudeParsed = parseFloat(longitude);
    const isLatitudeValid = (
        Boolean(latitudeParsed) &&
        !isNaN(latitudeParsed) &&
        isFinite(latitudeParsed) &&
        latitudeParsed >= latitudeMinimum &&
        latitudeParsed <= latitudeMaximum
    );
    if (!isLatitudeValid) {
        return "invalid latitude";
    }
    const isLongitudeValid = (
        Boolean(longitudeParsed) &&
        !isNaN(longitudeParsed) &&
        isFinite(longitudeParsed) &&
        longitudeParsed >= longitudeMinimum &&
        longitudeParsed <= longitudeMaximum
    );
    if (!isLongitudeValid) {
        return "invalid longitude";
    }
    const newPosition = { latitude: latitudeParsed, longitude: longitudeParsed };
    return newPosition;
};

export default UtilValidatorPosition;