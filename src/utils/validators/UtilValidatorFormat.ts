import { TypeQueryStringFormat } from "../../types/TypeQueryString";

const UtilValidatorFormat = function (format: any): format is TypeQueryStringFormat {
    return format;
};

export default UtilValidatorFormat;