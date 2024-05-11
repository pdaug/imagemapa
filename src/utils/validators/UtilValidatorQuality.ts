const qualityMinimum = 10;
const qualityMaximum = 100;
const qualityDefault = 70;

const UtilValidatorQuality = function (quality: string): number {
    const qualityParsed = parseFloat(quality);
    const isQualityValid = (
        Boolean(qualityParsed) &&
        !isNaN(qualityParsed) &&
        isFinite(qualityParsed) &&
        qualityParsed >= qualityMinimum &&
        qualityParsed <= qualityMaximum
    );
    const newQuality = (isQualityValid) ? qualityParsed : qualityDefault;
    return newQuality;
};

export default UtilValidatorQuality;