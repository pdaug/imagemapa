const UtilValidatorSize = function (size: string, defaultSize: number, sizeMinimum = 100, sizeMaximum = 1000): number {
    const sizeParsed = parseInt(size);
    const isSizeValid = (
        Boolean(sizeParsed) &&
        !isNaN(sizeParsed) &&
        isFinite(sizeParsed) &&
        sizeParsed >= sizeMinimum &&
        sizeParsed <= sizeMaximum
    );
    const newSize = (isSizeValid) ? sizeParsed : defaultSize;
    return newSize;
};

export default UtilValidatorSize;