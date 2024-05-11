import { IncomingMessage, ServerResponse } from "node:http";

import UtilSchemaMap from "../../utils/schemas/UtilSchemaMap";
import UtilFunctionResponse from "../../utils/tools/UtilToolResponse";
import UtilToolResponseError from "../../utils/tools/UtilToolResponseError";

import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import ServiceLeafletScriptMap from "../../services/leaflet/ServiceLeafletScriptMap";

export const ControllerEmbedMapMethod = "GET";
export const ControllerEmbedMapUrl = "/embed/map";

const ControllerEmbedMap = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url, method } = request;
    const isRoute = url.includes(ControllerEmbedMapUrl);
    const isMethod = (method === ControllerEmbedMapMethod);
    if (isRoute && isMethod) {
        const queryString = UtilSchemaMap(url, ControllerEmbedMapUrl);
        if (typeof queryString === "string") {
            return UtilToolResponseError(response, queryString);
        }
        const { latitude, longitude, zoom } = queryString;
        const script = ServiceLeafletScriptMap(latitude, longitude, zoom);
        const contentOptions = { script, height: NaN, width: NaN };
        const content = ServiceLeaflet(contentOptions);
        return UtilFunctionResponse(response, content);
    }
    return;
};

export default ControllerEmbedMap;