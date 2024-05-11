import { TypeQueryStringPosition } from "../../types/TypeQueryString";

const latitudeMinimum = -90;
const latitudeMaximum = 90;

const longitudeMinimum = -180;
const longitudeMaximum = 180;

const UtilValidatorPosition = function (latitude: string, longitude: string): TypeQueryStringPosition | null {
    const latitudeParsed = parseFloat(latitude);
    const longitudeParsed = parseFloat(longitude);
    const isLatitudeValid = (
        Boolean(latitudeParsed) &&
        !isNaN(latitudeParsed) &&
        isFinite(latitudeParsed) &&
        latitudeParsed >= latitudeMinimum &&
        latitudeParsed <= latitudeMaximum
    );
    const isLongitudeValid = (
        Boolean(longitudeParsed) &&
        !isNaN(longitudeParsed) &&
        isFinite(longitudeParsed) &&
        longitudeParsed >= longitudeMinimum &&
        longitudeParsed <= longitudeMaximum
    );
    const isPositionValid = (isLatitudeValid && isLongitudeValid);
    const newPosition = (isPositionValid) ? { latitude: latitudeParsed, longitude: longitudeParsed } : null;
    return newPosition;
};

export default UtilValidatorPosition;