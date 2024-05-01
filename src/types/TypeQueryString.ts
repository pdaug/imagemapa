import { TypeGenericPositions } from "./TypeGeneric";

export type TypeQueryStringFormat = "jpg" | "png" | "webp";

export type TypeQueryStringPosition = {
    latitude: number;
    longitude: number;
};

export type TypeQueryStringMap = TypeQueryStringPosition & {
    zoom: number;
    format: TypeQueryStringFormat,
    quality: number;
    width: number;
    height: number;
};

export type TypeQueryStringRoute = {
    positions: TypeGenericPositions;
    pointA: string;
    pointB: string;
    color: string;
    format: TypeQueryStringFormat,
    quality: number;
    width: number;
    height: number;
};
