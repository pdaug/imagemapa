import { ServerResponse } from "node:http";

import type { TypeGenericRequest } from "src/types/TypeGeneric";

import UtilSchemaIcon from "../../utils/schemas/UtilSchemaIcon";
import UtilToolResponse from "../../utils/tools/UtilToolResponse";
import UtilToolResponseError from "../../utils/tools/UtilToolResponseError";

import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import ServicePuppeteerCapture from "../../services/puppeteer/ServicePuppeteerCapture";
import ServiceLeafletScriptIcon from "../../services/leaflet/ServiceLeafletScriptIcon";

const ControllerImgIcon = async function (request: TypeGenericRequest, response: ServerResponse): Promise<void> {
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
    const imageSource = await ServicePuppeteerCapture(imageSourceOptions);
    const contentType = `image/${format}`;
    return UtilToolResponse(response, imageSource, 200, contentType);
};

export default ControllerImgIcon;