const FunctionNormalizeColor = function (color: string, defaultColor: string): string {
    const colorRegex = new RegExp("^#(?:[0-9a-fA-F]{3}){1,2}$", "g");
    const isColorValid = colorRegex.test(color);
    return (isColorValid) ? color : defaultColor;
};

export default FunctionNormalizeColor;