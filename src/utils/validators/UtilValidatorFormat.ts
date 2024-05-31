import { TypeQueryStringFormat } from "../../types/TypeQueryString";

const UtilValidatorFormatList = [ "jpg", "pdf", "webp" ];

const UtilValidatorFormat = function (format: unknown): format is TypeQueryStringFormat {
    if (typeof format !== "string") {
        return false;
    }
    const isFormatValid = UtilValidatorFormatList.includes(format);
    return isFormatValid;
};

export default UtilValidatorFormat;