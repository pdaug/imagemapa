const FunctionNormalizeSize = function (size: string, defaultSize: number): number {
    const sizeParsed = parseInt(size);
    const isSizeValid = (
        Boolean(sizeParsed) &&
        !isNaN(sizeParsed) &&
        isFinite(sizeParsed) &&
        sizeParsed >= 100 &&
        sizeParsed <= 1000
    );
    return (isSizeValid) ? sizeParsed : defaultSize;
};

export default FunctionNormalizeSize;