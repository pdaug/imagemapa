import { ServerResponse } from "node:http";

import type { TypeGenericRequest } from "../../types/TypeGeneric";

import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import ServiceLeafletScriptMap from "../../services/leaflet/ServiceLeafletScriptMap";

import UtilSchemaMap from "../../utils/schemas/UtilSchemaMap";
import UtilFunctionResponse from "../../utils/tools/UtilToolResponse";
import UtilFunctionQuery from "../../utils/functions/UtilFunctionQuery";
import UtilToolResponseError from "../../utils/tools/UtilToolResponseError";

const ControllerEmbedMap = async function (request: TypeGenericRequest, response: ServerResponse): Promise<void> {
    const { url, data } = request;
    if (!data.routeUrl || typeof data.routeUrl !== "string") {
        return UtilToolResponseError(response, "no route url");
    }
    const { routeUrl } = data;
    const queries = UtilFunctionQuery(url, routeUrl);
    if (typeof queries === "string") {
        return UtilToolResponseError(response, queries, true);
    }
    const queriesParsed = UtilSchemaMap(queries);
    if (typeof queriesParsed === "string") {
        return UtilToolResponseError(response, queriesParsed);
    }
    const { latitude, longitude, zoom } = queriesParsed;
    const script = ServiceLeafletScriptMap(latitude, longitude, zoom);
    const contentOptions = { script, height: NaN, width: NaN };
    const content = ServiceLeaflet(contentOptions);
    return UtilFunctionResponse(response, content);
};

export default ControllerEmbedMap;