const FunctionNormalizeSize = function (size: string, defaultSize: number, min = 100, max = 1000): number {
    const sizeParsed = parseInt(size);
    const isSizeValid = (
        Boolean(sizeParsed) &&
        !isNaN(sizeParsed) &&
        isFinite(sizeParsed) &&
        sizeParsed >= min &&
        sizeParsed <= max
    );
    return (isSizeValid) ? sizeParsed : defaultSize;
};

export default FunctionNormalizeSize;