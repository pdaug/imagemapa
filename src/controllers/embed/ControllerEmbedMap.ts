import { ServerResponse } from "node:http";

import type { TypeGenericRequest } from "src/types/TypeGeneric";

import UtilSchemaMap from "../../utils/schemas/UtilSchemaMap";
import UtilFunctionResponse from "../../utils/tools/UtilToolResponse";
import UtilToolResponseError from "../../utils/tools/UtilToolResponseError";

import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import ServiceLeafletScriptMap from "../../services/leaflet/ServiceLeafletScriptMap";

const ControllerEmbedMap = async function (request: TypeGenericRequest, response: ServerResponse): Promise<void> {
    const { url, data } = request;
    if (!data.routeUrl) {
        return UtilToolResponseError(response, "no route url")
    }
    const routeUrl = String(data.routeUrl);
    const queryString = UtilSchemaMap(url, routeUrl);
    if (typeof queryString === "string") {
        return UtilToolResponseError(response, queryString);
    }
    const { latitude, longitude, zoom } = queryString;
    const script = ServiceLeafletScriptMap(latitude, longitude, zoom);
    const contentOptions = { script, height: NaN, width: NaN };
    const content = ServiceLeaflet(contentOptions);
    request.data.ok = true;
    return UtilFunctionResponse(response, content);
};

export default ControllerEmbedMap;