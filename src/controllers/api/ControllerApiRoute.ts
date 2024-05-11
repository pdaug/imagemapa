import { IncomingMessage, ServerResponse } from "node:http";

import UtilToolResponse from "../../utils/tools/UtilToolResponse";
import UtilSchemaRoute from "../../utils/schemas/UtilSchemaRoute";

import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import ServicePuppeteer from "../../services/puppeteer/ServicePuppeteer";
import ServiceLeafletScriptRoute from "../../services/leaflet/ServiceLeafletScriptRoute";

export const ControllerApiRouteMethod = "GET";
export const ControllerApiRouteUrl = "/api/route";

const ControllerApiRoute = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url, method } = request;
    const isController = url.includes(ControllerApiRouteUrl);
    const isMethod = (method === ControllerApiRouteMethod);
    if (isController && isMethod) {
        const queryString = UtilSchemaRoute(url, ControllerApiRouteUrl);
        if (!queryString) {
            return UtilToolResponse(response, 400);
        }
        const { positions, pointA, pointB, color, format, quality, height, width } = queryString;
        const positionsStringified = JSON.stringify(positions);
        const script = ServiceLeafletScriptRoute(positionsStringified, color, pointA, pointB);
        const contentOptions = { script, height, width };
        const content = ServiceLeaflet(contentOptions);
        const imageSourceOptions = { content, format, quality, height, width };
        const imageSource = await ServicePuppeteer(imageSourceOptions);
        return UtilToolResponse(response, imageSource);
    }
    return;
};

export default ControllerApiRoute;