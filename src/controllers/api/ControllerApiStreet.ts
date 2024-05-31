import { ServerResponse } from "node:http";

import type { TypeGenericRequest } from "../../types/TypeGeneric";

import ServiceStreet from "../../services/street/ServiceStreet";

import UtilToolResponse from "../../utils/tools/UtilToolResponse";
import UtilSchemaStreet from "../../utils/schemas/UtilSchemaStreet";
import UtilFunctionQuery from "../../utils/functions/UtilFunctionQuery";
import UtilFunctionContent from "../../utils/functions/UtilFunctionContent";
import UtilToolResponseError from "../../utils/tools/UtilToolResponseError";

const ControllerApiStreet = async function (request: TypeGenericRequest, response: ServerResponse): Promise<void> {
    const { url, data } = request;
    if (!data.routeUrl || typeof data.routeUrl !== "string") {
        return UtilToolResponseError(response, "no route url");
    }
    const { routeUrl } = data;
    const queries = UtilFunctionQuery(url, routeUrl);
    if (typeof queries === "string") {
        return UtilToolResponseError(response, queries, true);
    }
    const queriesParsed = UtilSchemaStreet(queries);
    if (typeof queriesParsed === "string") {
        return UtilToolResponseError(response, queriesParsed, true);
    }
    const result = ServiceStreet(queriesParsed);
    const content = UtilFunctionContent(200, url, result);
    return UtilToolResponse(response, content, 200);
};

export default ControllerApiStreet;