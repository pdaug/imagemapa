import { IncomingMessage, ServerResponse } from "node:http";

import UtilFunctionResponse from "../../utils/tools/UtilToolResponse";

const ControllerErrorNotFound = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    return UtilFunctionResponse(response, {
        status: "error",
        code: 404,
        message: "Not Found",
        path: request.url,
        result: null,
        timestamp: Date.now(),
    });
};

export default ControllerErrorNotFound;