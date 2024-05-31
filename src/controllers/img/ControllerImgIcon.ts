import { ServerResponse } from "node:http";

import type { TypeGenericRequest } from "../../types/TypeGeneric";

import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import ServicePuppeteerCapture from "../../services/puppeteer/ServicePuppeteerCapture";
import ServiceLeafletScriptIcon from "../../services/leaflet/ServiceLeafletScriptIcon";

import UtilSchemaIcon from "../../utils/schemas/UtilSchemaIcon";
import UtilToolResponse from "../../utils/tools/UtilToolResponse";
import UtilFunctionQuery from "../../utils/functions/UtilFunctionQuery";
import UtilToolResponseError from "../../utils/tools/UtilToolResponseError";

const ControllerImgIcon = async function (request: TypeGenericRequest, response: ServerResponse): Promise<void> {
    const { url, data } = request;
    if (!data.routeUrl || typeof data.routeUrl !== "string") {
        return UtilToolResponseError(response, "no route url");
    }
    const { routeUrl } = data;
    const queries = UtilFunctionQuery(url, routeUrl);
    if (typeof queries === "string") {
        return UtilToolResponseError(response, queries, true);
    }
    const queriesParsed = UtilSchemaIcon(queries);
    if (typeof queriesParsed === "string") {
        return UtilToolResponseError(response, queriesParsed, true);
    }
    const { latitude, longitude, zoom, icon, size, format, quality, height, width } = queriesParsed;
    const script = ServiceLeafletScriptIcon(latitude, longitude, zoom, icon, size);
    const contentOptions = { script, height, width };
    const content = ServiceLeaflet(contentOptions);
    const imageSourceOptions = { content, format, quality, height, width };
    const imageSource = await ServicePuppeteerCapture(imageSourceOptions);
    const contentType = `image/${format}`;
    return UtilToolResponse(response, imageSource, 200, contentType);
};

export default ControllerImgIcon;