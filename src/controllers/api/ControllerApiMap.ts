import { ServerResponse } from "node:http";

import type { TypeGenericRequest } from "src/types/TypeGeneric";

import UtilSchemaMap from "../../utils/schemas/UtilSchemaMap";
import UtilToolResponse from "../../utils/tools/UtilToolResponse";
import UtilToolResponseError from "../../utils/tools/UtilToolResponseError";

import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import ServicePuppeteer from "../../services/puppeteer/ServicePuppeteer";
import ServiceLeafletScriptMap from "../../services/leaflet/ServiceLeafletScriptMap";

const ControllerApiMap = async function (request: TypeGenericRequest, response: ServerResponse): Promise<void> {
    const { url, data } = request;
    if (!data.routeUrl) {
        return UtilToolResponseError(response, "no route url")
    }
    const routeUrl = String(data.routeUrl);
    const queryString = UtilSchemaMap(url, routeUrl);
    if (typeof queryString === "string") {
        return UtilToolResponseError(response, queryString, true);
    }
    const { latitude, longitude, zoom, format, quality, height, width } = queryString;
    const script = ServiceLeafletScriptMap(latitude, longitude, zoom);
    const contentOptions = { script, height, width };
    const content = ServiceLeaflet(contentOptions);
    const imageSourceOptions = { content, format, quality, height, width };
    const imageSource = await ServicePuppeteer(imageSourceOptions);
    const contentType = `image/${format}`;
    request.data.ok = true;
    return UtilToolResponse(response, imageSource, 200, contentType);
};

export default ControllerApiMap;