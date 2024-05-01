const FunctionNormalizePoint = function (point: string, defaultPoint: string): string {
    const pointRegex = new RegExp("[a-zA-Z0-9]{1}", "g");
    const isPointValid = pointRegex.test(point);
    return (isPointValid) ? point : defaultPoint;
};

export default FunctionNormalizePoint;