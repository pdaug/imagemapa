import { IncomingMessage, ServerResponse } from "node:http";

import UtilToolResponse from "../../utils/tools/UtilToolResponse";
import UtilSchemaRoute from "../../utils/schemas/UtilSchemaRoute";
import UtilToolResponseError from "../../utils/tools/UtilToolResponseError";

import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import ServicePuppeteer from "../../services/puppeteer/ServicePuppeteer";
import ServiceLeafletScriptRoute from "../../services/leaflet/ServiceLeafletScriptRoute";

export const ControllerApiRouteMethod = "GET";
export const ControllerApiRouteUrl = "/api/route";

const ControllerApiRoute = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url, method } = request;
    const isRoute = url.includes(ControllerApiRouteUrl);
    const isMethod = (method === ControllerApiRouteMethod);
    if (isRoute && isMethod) {
        const queryString = UtilSchemaRoute(url, ControllerApiRouteUrl);
        if (typeof queryString === "string") {
            return UtilToolResponseError(response, queryString, true);
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