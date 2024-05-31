import ConfigLeaflet from "../../config/ConfigLeaflet";

const UtilValidatorZoom = function (zoom: unknown): number {
    const isZoomValid = (
        Boolean(zoom) &&
        typeof zoom === "number" &&
        !isNaN(zoom) &&
        isFinite(zoom) &&
        zoom >= ConfigLeaflet.zoomMinimium &&
        zoom <= ConfigLeaflet.zoomMaximum
    );
    const newZoom = (isZoomValid) ? zoom : ConfigLeaflet.zoomDefault;
    return newZoom;
};

export default UtilValidatorZoom;