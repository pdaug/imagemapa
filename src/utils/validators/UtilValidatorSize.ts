const UtilValidatorSize = function (size: unknown, defaultSize: number, sizeMinimum = 100, sizeMaximum = 1000): number {
    const isSizeValid = (
        Boolean(size) &&
        typeof size === "number" &&
        !isNaN(size) &&
        isFinite(size) &&
        size >= sizeMinimum &&
        size <= sizeMaximum
    );
    const newSize = (isSizeValid) ? size : defaultSize;
    return newSize;
};

export default UtilValidatorSize;