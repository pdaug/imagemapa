import { IncomingMessage, ServerResponse } from "node:http";

import UtilFunctionResponse from "../../utils/tools/UtilToolResponse";
import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import UtilSchemaMap from "../../utils/schemas/UtilSchemaMap";

export const ControllerEmbedMapMethod = "GET";
export const ControllerEmbedMapUrl = "/embed/map";

const ControllerEmbedMap = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url, method } = request;
    const isController = url.includes(ControllerEmbedMapUrl);
    const isMethod = (method === ControllerEmbedMapMethod);
    if (isController && isMethod) {
        const queryString = UtilSchemaMap(url, ControllerEmbedMapUrl);
        if (!queryString) {
            return UtilFunctionResponse(response, 400);
        }
        const { latitude, longitude, zoom } = queryString;
        const script = `
            const map = L.map("map", {
                zoomControl: false,
                attributionControl: false,
            });
            map.setView([${latitude},${longitude}], ${zoom});
            L.tileLayer("http://{s}.google.com/vt/lyrs=m&hl=pt-BR&x={x}&y={y}&z={z}&scale=2", {
                maxZoom: 20,
                subdomains:[ "mt0", "mt1", "mt2", "mt3" ],
            }).addTo(map);
        `;
        const contentOptions = { script, height: NaN, width: NaN };
        const content = ServiceLeaflet(contentOptions);
        return UtilFunctionResponse(response, content);
    }
    return;
};

export default ControllerEmbedMap;