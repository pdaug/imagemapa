import { ServerResponse } from "node:http";

import type { TypeGenericRequest } from "src/types/TypeGeneric";

import UtilToolResponse from "../../utils/tools/UtilToolResponse";
import UtilSchemaRoute from "../../utils/schemas/UtilSchemaRoute";
import UtilToolResponseError from "../../utils/tools/UtilToolResponseError";

import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import ServicePuppeteer from "../../services/puppeteer/ServicePuppeteer";
import ServiceLeafletScriptRoute from "../../services/leaflet/ServiceLeafletScriptRoute";

const ControllerApiRoute = async function (request: TypeGenericRequest, response: ServerResponse): Promise<void> {
    const { url, data } = request;
    if (!data.routeUrl) {
        return UtilToolResponseError(response, "no route url")
    }
    const routeUrl = String(data.routeUrl);
    const queryString = UtilSchemaRoute(url, routeUrl);
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
    const contentType = `image/${format}`;
    request.data.ok = true;
    return UtilToolResponse(response, imageSource, 200, contentType);
};

export default ControllerApiRoute;