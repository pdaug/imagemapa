import { ServerResponse } from "node:http";

import type { TypeGenericRequest } from "../../types/TypeGeneric";

import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import ServicePuppeteerCapture from "../../services/puppeteer/ServicePuppeteerCapture";
import ServiceLeafletScriptRoute from "../../services/leaflet/ServiceLeafletScriptRoute";

import UtilToolResponse from "../../utils/tools/UtilToolResponse";
import UtilSchemaRoute from "../../utils/schemas/UtilSchemaRoute";
import UtilFunctionQuery from "../../utils/functions/UtilFunctionQuery";
import UtilToolResponseError from "../../utils/tools/UtilToolResponseError";

const ControllerImgRoute = async function (request: TypeGenericRequest, response: ServerResponse): Promise<void> {
    const { url, data } = request;
    if (!data.routeUrl || typeof data.routeUrl !== "string") {
        return UtilToolResponseError(response, "no route url");
    }
    const { routeUrl } = data;
    const queries = UtilFunctionQuery(url, routeUrl);
    if (typeof queries === "string") {
        return UtilToolResponseError(response, queries, true);
    }
    const queryParsed = UtilSchemaRoute(queries);
    if (typeof queryParsed === "string") {
        return UtilToolResponseError(response, queryParsed, true);
    }
    const { positions, pointA, pointB, color, format, quality, height, width } = queryParsed;
    const positionsStringified = JSON.stringify(positions);
    const script = ServiceLeafletScriptRoute(positionsStringified, color, pointA, pointB);
    const contentOptions = { script, height, width };
    const content = ServiceLeaflet(contentOptions);
    const imageSourceOptions = { content, format, quality, height, width };
    const imageSource = await ServicePuppeteerCapture(imageSourceOptions);
    const contentType = `image/${format}`;
    return UtilToolResponse(response, imageSource, 200, contentType);
};

export default ControllerImgRoute;