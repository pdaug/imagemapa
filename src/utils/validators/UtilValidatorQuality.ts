const qualityMinimum = 10;
const qualityMaximum = 100;
const qualityDefault = 70;

const UtilValidatorQuality = function (quality: unknown): number {
    const isQualityValid = (
        Boolean(quality) &&
        typeof quality === "number" &&
        !isNaN(quality) &&
        isFinite(quality) &&
        quality >= qualityMinimum &&
        quality <= qualityMaximum
    );
    const newQuality = (isQualityValid) ? quality : qualityDefault;
    return newQuality;
};

export default UtilValidatorQuality;