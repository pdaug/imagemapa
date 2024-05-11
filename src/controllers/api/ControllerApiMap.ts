import { IncomingMessage, ServerResponse } from "node:http";

import UtilToolResponse from "../../utils/tools/UtilToolResponse";
import ServicePuppeteer from "../../services/puppeteer/ServicePuppeteer";
import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import UtilSchemaMap from "../../utils/schemas/UtilSchemaMap";

export const ControllerApiMapMethod = "GET";
export const ControllerApiMapUrl = "/api/map";

const ControllerApiMap = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url, method } = request;
    const isController = url.includes(ControllerApiMapUrl);
    const isMethod = (method === ControllerApiMapMethod);
    if (isController && isMethod) {
        const queryString = UtilSchemaMap(url, ControllerApiMapUrl);
        if (!queryString) {
            return UtilToolResponse(response, 400);
        }
        const { latitude, longitude, zoom, format, quality, height, width } = queryString;
        const script = `
            const map = L.map("map", {
                zoomControl: false,
                attributionControl: false,
            });
            map.setView([${latitude},${longitude}], ${zoom});
            L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
                maxZoom: 20,
                subdomains:[ "mt0", "mt1", "mt2", "mt3" ],
            }).addTo(map);
        `;
        const contentOptions = { script, height, width };
        const content = ServiceLeaflet(contentOptions);
        console.log(content);
        const imageSourceOptions = { content, format, quality, height, width };
        const imageSource = await ServicePuppeteer(imageSourceOptions);
        const contentType = `image/${format}`;
        return UtilToolResponse(response, imageSource, 200, contentType);
    }
    return;
};

export default ControllerApiMap;