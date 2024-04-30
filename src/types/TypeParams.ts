export type TypeParamsFormat = "jpg" | "png" | "webp";

export type TypeParamsPosition = {
    latitude: number;
    longitude: number;
};

export type TypeParams = TypeParamsPosition & {
    zoom: number;
    format: TypeParamsFormat,
    quality: number;
    width: number;
    height: number;
};
