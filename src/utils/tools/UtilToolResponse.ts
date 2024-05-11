import { ServerResponse } from "node:http";

const UtilToolResponseCodes = {
    200: "Ok",
    400: "Bad Request",
    404: "Not Found",
    405: "Method Not Allowed",
};

const UtilToolResponse = function (response: ServerResponse, content: string | number | object, code = 200, contentType = "text/html"): void {
    if (typeof content === "string" || content instanceof Buffer) {
        response.statusCode = code;
        response.setHeader("Content-Type", contentType);
        response.write(content);
        response.end();
        return;
    }
    if (typeof content === "object") {
        const contentStringify = JSON.stringify(content);
        response.statusCode = code;
        response.setHeader("Content-Type", "application/json");
        response.write(contentStringify);
        response.end();
        return;
    }
    const contentStringify = UtilToolResponseCodes[content];
    response.statusCode = code;
    response.setHeader("Content-Type", "text/plain");
    response.write(contentStringify);
    response.end();
    return;
};

export default UtilToolResponse;