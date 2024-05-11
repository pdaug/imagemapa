const UtilValidatorColor = function (color: string, defaultColor: string): string {
    const colorRegex = new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$", "g");
    const isColorValid = colorRegex.test(color);
    const newColor = (isColorValid) ? color : defaultColor;
    return newColor;
};

export default UtilValidatorColor;