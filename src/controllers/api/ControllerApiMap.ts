import { IncomingMessage, ServerResponse } from "node:http";

import UtilSchemaMap from "../../utils/schemas/UtilSchemaMap";
import UtilToolResponse from "../../utils/tools/UtilToolResponse";

import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import ServicePuppeteer from "../../services/puppeteer/ServicePuppeteer";
import ServiceLeafletScriptMap from "../../services/leaflet/ServiceLeafletScriptMap";

export const ControllerApiMapMethod = "GET";
export const ControllerApiMapUrl = "/api/map";

const ControllerApiMap = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url, method } = request;
    const isController = url.includes(ControllerApiMapUrl);
    const isMethod = (method === ControllerApiMapMethod);
    if (isController && isMethod) {
        const queryString = UtilSchemaMap(url, ControllerApiMapUrl);
        if (!queryString) {
            return UtilToolResponse(response, 400);
        }
        const { latitude, longitude, zoom, format, quality, height, width } = queryString;
        const script = ServiceLeafletScriptMap(latitude, longitude, zoom);
        const contentOptions = { script, height, width };
        const content = ServiceLeaflet(contentOptions);
        const imageSourceOptions = { content, format, quality, height, width };
        const imageSource = await ServicePuppeteer(imageSourceOptions);
        const contentType = `image/${format}`;
        return UtilToolResponse(response, imageSource, 200, contentType);
    }
    return;
};

export default ControllerApiMap;