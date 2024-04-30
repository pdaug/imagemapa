import { ServerResponse } from "node:http";

const FunctionResponseCodes = {
    200: "Ok",
    400: "Bad Request",
    405: "Method Not Allowed",
};

const FunctionResponse = function (response: ServerResponse, content: string | number | object, code = 200): void {
    if (typeof content === "string" || content instanceof Buffer) {
        response.statusCode = code;
        response.write(content);
        response.end();
        return;
    }
    if (typeof content === "object") {
        response.statusCode = code;
        const contentStringify = JSON.stringify(content);
        response.write(contentStringify);
        response.end();
        return;
    }
    response.statusCode = content;
    response.write(FunctionResponseCodes[content]);
    response.end();
    return;
};

export default FunctionResponse;