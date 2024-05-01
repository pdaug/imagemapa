import { IncomingMessage, ServerResponse } from "node:http";

import FunctionResponse from "../../functions/FunctionResponse";
import FunctionMapStructure from "../../functions/FunctionMapStructure";
import FunctionQueryStringMap from "../../functions/FunctionQueryStringMap";

export const EndpointEmbedMapMethod = "GET";
export const EndpointEmbedMapUrl = "/embed/map";

const EndpointEmbedMap = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url, method } = request;
    const isEndpoint = url.includes(EndpointEmbedMapUrl);
    const isMethod = (method === EndpointEmbedMapMethod);
    if (isEndpoint && isMethod) {
        const queryString = FunctionQueryStringMap(url, EndpointEmbedMapUrl);
        if (!queryString) {
            return FunctionResponse(response, 400);
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
        const content = FunctionMapStructure(contentOptions);
        return FunctionResponse(response, content);
    }
    return;
};

export default EndpointEmbedMap;