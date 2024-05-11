import { IncomingMessage, ServerResponse } from "node:http";

import UtilSchemaIcon from "../../utils/schemas/UtilSchemaIcon";
import UtilToolResponse from "../../utils/tools/UtilToolResponse";

import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import ServicePuppeteer from "../../services/puppeteer/ServicePuppeteer";
import ServiceLeafletScriptIcon from "../../services/leaflet/ServiceLeafletScriptIcon";

export const ControllerApiIconMethod = "GET";
export const ControllerApiIconUrl = "/api/icon";

const ControllerApiIcon = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url, method } = request;
    const isController = url.includes(ControllerApiIconUrl);
    const isMethod = (method === ControllerApiIconMethod);
    if (isController && isMethod) {
        const queryString = UtilSchemaIcon(url, ControllerApiIconUrl);
        if (!queryString) {
            return UtilToolResponse(response, 400);
        }
        const { latitude, longitude, zoom, icon, size, format, quality, height, width } = queryString;
        const script = ServiceLeafletScriptIcon(latitude, longitude, zoom, icon, size);
        const contentOptions = { script, height, width };
        const content = ServiceLeaflet(contentOptions);
        const imageSourceOptions = { content, format, quality, height, width };
        const imageSource = await ServicePuppeteer(imageSourceOptions);
        return UtilToolResponse(response, imageSource);
    }
    return;
};

export default ControllerApiIcon;