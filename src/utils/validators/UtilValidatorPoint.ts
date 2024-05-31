const UtilValidatorPoint = function (point: unknown, defaultPoint: string): string {
    if (!point || typeof point !== "string") {
        return defaultPoint;
    }
    const pointRegex = new RegExp("[a-zA-Z0-9]{1}", "g");
    const isPointValid = pointRegex.test(point);
    return (isPointValid) ? point : defaultPoint;
};

export default UtilValidatorPoint;