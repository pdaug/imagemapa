import { IncomingMessage, ServerResponse } from "node:http";

import UtilSchemaIcon from "../../utils/schemas/UtilSchemaIcon";
import UtilToolResponse from "../../utils/tools/UtilToolResponse";
import UtilToolResponseError from "../../utils/tools/UtilToolResponseError";

import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import ServicePuppeteer from "../../services/puppeteer/ServicePuppeteer";
import ServiceLeafletScriptIcon from "../../services/leaflet/ServiceLeafletScriptIcon";

export const ControllerApiIconMethod = "GET";
export const ControllerApiIconUrl = "/api/icon";

const ControllerApiIcon = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url, method } = request;
    const isRoute = url.includes(ControllerApiIconUrl);
    const isMethod = (method === ControllerApiIconMethod);
    if (isRoute && isMethod) {
        const queryString = UtilSchemaIcon(url, ControllerApiIconUrl);
        if (typeof queryString === "string") {
            return UtilToolResponseError(response, queryString, true);
        }
        const { latitude, longitude, zoom, icon, size, format, quality, height, width } = queryString;
        const script = ServiceLeafletScriptIcon(latitude, longitude, zoom, icon, size);
        const contentOptions = { script, height, width };
        const content = ServiceLeaflet(contentOptions);
        const imageSourceOptions = { content, format, quality, height, width };
        const imageSource = await ServicePuppeteer(imageSourceOptions);
        const contentType = `image/${format}`;
        return UtilToolResponse(response, imageSource, 200, contentType);
    }
    return;
};

export default ControllerApiIcon;