import { TypeQueryStringFormat } from "../types/TypeQueryString";

const FunctionNormalizeFormat = function (format: any): format is TypeQueryStringFormat {
    return format;
};

export default FunctionNormalizeFormat;