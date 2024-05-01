const FunctionNormalizeQuality = function (quality: string): number {
    const qualityParsed = parseFloat(quality);
    const isQualityValid = (
        Boolean(qualityParsed) &&
        !isNaN(qualityParsed) &&
        isFinite(qualityParsed) &&
        qualityParsed >= 10 &&
        qualityParsed <= 100
    );
    return (isQualityValid) ? qualityParsed : 70;
};

export default FunctionNormalizeQuality;