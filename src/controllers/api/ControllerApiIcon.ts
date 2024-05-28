import { ServerResponse } from "node:http";

import type { TypeGenericRequest } from "src/types/TypeGeneric";

import UtilSchemaIcon from "../../utils/schemas/UtilSchemaIcon";
import UtilToolResponse from "../../utils/tools/UtilToolResponse";
import UtilToolResponseError from "../../utils/tools/UtilToolResponseError";

import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import ServicePuppeteer from "../../services/puppeteer/ServicePuppeteer";
import ServiceLeafletScriptIcon from "../../services/leaflet/ServiceLeafletScriptIcon";

const ControllerApiIcon = async function (request: TypeGenericRequest, response: ServerResponse): Promise<void> {
    const { url, data } = request;
    if (!data.routeUrl) {
        return UtilToolResponseError(response, "no route url")
    }
    const routeUrl = String(data.routeUrl);
    const queryString = UtilSchemaIcon(url, routeUrl);
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
    request.data.ok = true;
    return UtilToolResponse(response, imageSource, 200, contentType);
};

export default ControllerApiIcon;