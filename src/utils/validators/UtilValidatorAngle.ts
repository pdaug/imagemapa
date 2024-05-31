const UtilValidatorAngle = function (angle: unknown): number {
    const isAngleValid = (
        Boolean(angle) &&
        typeof angle === "number" &&
        !isNaN(angle) &&
        isFinite(angle) &&
        angle >= 0 &&
        angle <= 360
    );
    const newAngle = (isAngleValid) ? angle : 0;
    return newAngle;
};

export default UtilValidatorAngle;