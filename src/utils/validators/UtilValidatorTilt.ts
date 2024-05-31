const UtilValidatorTilt = function (tilt: unknown): number {
    const isTiltValid = (
        Boolean(tilt) &&
        typeof tilt === "number" &&
        !isNaN(tilt) &&
        isFinite(tilt) &&
        tilt >= -90 &&
        tilt <= 90
    );
    const newTilt = (isTiltValid) ? tilt : 0;
    return newTilt;
};

export default UtilValidatorTilt;