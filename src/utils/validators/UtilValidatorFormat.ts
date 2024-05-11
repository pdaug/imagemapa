import { TypeQueryStringFormat } from "../../types/TypeQueryString";

const UtilValidatorFormatList = [ "jpg", "pdf", "webp" ];

const UtilValidatorFormat = function (format: string): format is TypeQueryStringFormat {
    const isFormatValid = UtilValidatorFormatList.includes(format);
    return isFormatValid;
};

export default UtilValidatorFormat;