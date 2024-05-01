const FunctionNormalizeZoom = function (zoom: string): number {
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

export default FunctionNormalizeZoom;