import { ServerResponse } from "node:http";

import type { TypeGenericRequest } from "../../types/TypeGeneric";

import ServiceStreetEmbed from "../../services/street/ServiceStreetEmbed";

import UtilSchemaStreet from "../../utils/schemas/UtilSchemaStreet";
import UtilFunctionResponse from "../../utils/tools/UtilToolResponse";
import UtilFunctionQuery from "../../utils/functions/UtilFunctionQuery";
import UtilToolResponseError from "../../utils/tools/UtilToolResponseError";

const ControllerEmbedStreet = async function (request: TypeGenericRequest, response: ServerResponse): Promise<void> {
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
        return UtilToolResponseError(response, queriesParsed);
    }
    const content = ServiceStreetEmbed(queriesParsed);
    return UtilFunctionResponse(response, content);
};

export default ControllerEmbedStreet;