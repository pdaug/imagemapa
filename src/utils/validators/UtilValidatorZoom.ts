import ConfigLeaflet from "../../config/ConfigLeaflet";

const UtilValidatorZoom = function (zoom: string): number {
    const zoomParsed = parseFloat(zoom);
    const isZoomValid = (
        Boolean(zoomParsed) &&
        !isNaN(zoomParsed) &&
        isFinite(zoomParsed) &&
        zoomParsed >= ConfigLeaflet.zoomMinimium &&
        zoomParsed <= ConfigLeaflet.zoomMaximum
    );
    const newZoom = (isZoomValid) ? zoomParsed : ConfigLeaflet.zoomDefault;
    return newZoom;
};

export default UtilValidatorZoom;