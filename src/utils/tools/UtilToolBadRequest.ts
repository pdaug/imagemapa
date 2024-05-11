import { ServerResponse } from "node:http";

const UtilToolBadRequest = function (response: ServerResponse, content: string): void {
    response.statusCode = 400;
    response.write(content);
    response.end();
    return;
};

export default UtilToolBadRequest;