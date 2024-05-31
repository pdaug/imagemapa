const UtilValidatorColor = function (color: unknown, defaultColor: string): string {
    if (!color || typeof color !== "string") {
        return defaultColor;
    }
    const colorRegex = new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$", "g");
    const isColorValid = colorRegex.test(color);
    const newColor = (isColorValid) ? color : defaultColor;
    return newColor;
};

export default UtilValidatorColor;