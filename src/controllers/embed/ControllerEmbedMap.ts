import { IncomingMessage, ServerResponse } from "node:http";

import UtilSchemaMap from "../../utils/schemas/UtilSchemaMap";
import UtilFunctionResponse from "../../utils/tools/UtilToolResponse";

import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import ServiceLeafletScriptMap from "../../services/leaflet/ServiceLeafletScriptMap";

export const ControllerEmbedMapMethod = "GET";
export const ControllerEmbedMapUrl = "/embed/map";

const ControllerEmbedMap = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url, method } = request;
    const isController = url.includes(ControllerEmbedMapUrl);
    const isMethod = (method === ControllerEmbedMapMethod);
    if (isController && isMethod) {
        const queryString = UtilSchemaMap(url, ControllerEmbedMapUrl);
        if (!queryString) {
            return UtilFunctionResponse(response, 400);
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