import { URLSearchParams } from "node:url";

import type { TypeGenericObjectOptionalValues } from "../types/TypeGeneric";
import type { TypeParams, TypeParamsFormat, TypeParamsPosition } from "../types/TypeParams";

const FunctionNormalizeParamsPosition = function (
    latitude: string, 
    longitude: string,
): TypeParamsPosition | null {
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
    const isPositionValid = (isLatitudeValid || isLongitudeValid);
    return (isPositionValid) ? {
        latitude: latitudeParsed,
        longitude: longitudeParsed,
    } : null;
};

const FunctionNormalizeParamsZoom = function (zoom: string): number {
    const zoomParsed = parseFloat(zoom);
    const isZoomValid = (
        Boolean(zoomParsed) &&
        !isNaN(zoomParsed) &&
        isFinite(zoomParsed) &&
        zoomParsed >= 3 &&
        zoomParsed <= 20
    );
    return (isZoomValid) ? zoomParsed : 16;
};

const FunctionNormalizeParamsFormat = function (format: any): format is TypeParamsFormat {
    return format;
};

const FunctionNormalizeParamsQuality = function (quality: string): number {
    const qualityParsed = parseFloat(quality);
    const isQualityValid = (
        Boolean(qualityParsed) &&
        !isNaN(qualityParsed) &&
        isFinite(qualityParsed) &&
        qualityParsed >= 10 &&
        qualityParsed <= 100
    );
    return (isQualityValid) ? qualityParsed : 70;
};

const FunctionNormalizeParamsSize = function (size: string, defaultSize: number): number {
    const sizeParsed = parseInt(size);
    const isSizeValid = (
        Boolean(sizeParsed) &&
        !isNaN(sizeParsed) &&
        isFinite(sizeParsed) &&
        sizeParsed >= 100 &&
        sizeParsed <= 1000
    );
    return (isSizeValid) ? sizeParsed : defaultSize;
};

const FunctionNormalizeParams = function (params: TypeGenericObjectOptionalValues): TypeParams | null {
    const position = FunctionNormalizeParamsPosition(params.lat, params.lng);
    if (!position) {
        return null;
    }
    const { latitude, longitude } = position;
    const zoom = FunctionNormalizeParamsZoom(params.z);
    const format = FunctionNormalizeParamsFormat(params.format) ? params.format : "jpg";
    const quality = FunctionNormalizeParamsQuality(params.quality);
    const width = FunctionNormalizeParamsSize(params.width, 640);
    const height = FunctionNormalizeParamsSize(params.height, 480);
    const paramsNormalized: TypeParams = {
        latitude,
        longitude,
        zoom,
        format,
        quality,
        width,
        height,
    };
    return paramsNormalized;
};

const FunctionGetParams = function (url: string): TypeParams | null {
    const currentUrl = url.replaceAll("/", "");
    const currentUrlParams = new URLSearchParams(currentUrl);
    const params = new Object() as TypeGenericObjectOptionalValues;
    const listParams = [ "lat", "lng", "z", "format", "quality", "width", "height" ];
    for (const field of listParams) {
        params[field] = currentUrlParams.get(field);
    }
    const paramsNormalized = FunctionNormalizeParams(params);
    return paramsNormalized;
};

export default FunctionGetParams;