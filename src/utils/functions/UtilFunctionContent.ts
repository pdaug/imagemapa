import Config from "../../config";
import type { TypeGenericResponse, TypeGenericResponseCode } from "../../types/TypeGeneric";

const UtilFunctionContentCode: Record<TypeGenericResponseCode, Pick<TypeGenericResponse, "status" | "message">> = {
    200: { status: "success", message: "Ok", },
    201: { status: "success", message: "Created", },
    204: { status: "success", message: "No Content", },
    400: { status: "error", message: "Bad Request", },
    401: { status: "error", message: "Unauthorized", },
    404: { status: "error", message: "Not Found", },
    405: { status: "error", message: "Method Not Allowed", },
    500: { status: "error", message: "Server Internal Error", },
};

const UtilFunctionContent = function (code: keyof typeof UtilFunctionContentCode, path: string, result: unknown): TypeGenericResponse {
    const timestamp = Date.now();
    const { version, server } = Config;
    const { status, message } = UtilFunctionContentCode[code];
    const content = { version, server, status, code, message, path, result, timestamp, };
    return content;
};

export default UtilFunctionContent;