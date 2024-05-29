import { ServerResponse } from "node:http";

import type { TypeGenericRequest } from "src/types/TypeGeneric";

import UtilSchemaMap from "../../utils/schemas/UtilSchemaMap";
import UtilToolResponse from "../../utils/tools/UtilToolResponse";
import UtilToolResponseError from "../../utils/tools/UtilToolResponseError";

import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import ServiceLeafletScriptMap from "../../services/leaflet/ServiceLeafletScriptMap";
import ServicePuppeteerCapture from "../../services/puppeteer/ServicePuppeteerCapture";

const ControllerImgMap = async function (request: TypeGenericRequest, response: ServerResponse): Promise<void> {
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
    const imageSource = await ServicePuppeteerCapture(imageSourceOptions);
    const contentType = `image/${format}`;
    return UtilToolResponse(response, imageSource, 200, contentType);
};

export default ControllerImgMap;