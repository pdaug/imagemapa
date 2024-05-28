import { ServerResponse } from "node:http";

import type { TypeGenericRequest } from "../../types/TypeGeneric";
import UtilFunctionResponse from "../../utils/tools/UtilToolResponse";

const UtilToolNotFound = async function (request: TypeGenericRequest, response: ServerResponse): Promise<void> {
    if (!request.data.ok) {
        return UtilFunctionResponse(response, {
            status: "error",
            code: 404,
            message: "Not Found",
            path: request.url,
            result: null,
            timestamp: Date.now(),
        });
    }
};

export default UtilToolNotFound;