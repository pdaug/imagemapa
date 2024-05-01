import { TypeQueryStringPosition } from "../types/TypeQueryString";

const FunctionNormalizePosition = function (
    latitude: string, 
    longitude: string,
): TypeQueryStringPosition | null {
    const latitudeParsed = parseFloat(latitude);
    const longitudeParsed = parseFloat(longitude);
    const isLatitudeValid = (
        Boolean(latitudeParsed) &&
        !isNaN(latitudeParsed) &&
        isFinite(latitudeParsed) &&
        latitudeParsed >= -90 &&
        latitudeParsed <= 90
    );
    const isLongitudeValid = (
        Boolean(longitudeParsed) &&
        !isNaN(longitudeParsed) &&
        isFinite(longitudeParsed) &&
        longitudeParsed >= -180 &&
        longitudeParsed <= 180
    );
    const isPositionValid = (isLatitudeValid && isLongitudeValid);
    return (isPositionValid) ? {
        latitude: latitudeParsed,
        longitude: longitudeParsed,
    } : null;
};

export default FunctionNormalizePosition;