import { IncomingMessage, ServerResponse } from "node:http";

import FunctionResponse from "../../functions/FunctionResponse";
import FunctionMapImage from "../../functions/FunctionMapImage";
import FunctionMapStructure from "../../functions/FunctionMapStructure";
import FunctionQueryStringMap from "../../functions/FunctionQueryStringMap";

export const EndpointApiMapMethod = "GET";
export const EndpointApiMapUrl = "/api/map";

const EndpointApiMap = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url, method } = request;
    const isEndpoint = url.includes(EndpointApiMapUrl);
    const isMethod = (method === EndpointApiMapMethod);
    if (isEndpoint && isMethod) {
        const queryString = FunctionQueryStringMap(url, EndpointApiMapUrl);
        if (!queryString) {
            return FunctionResponse(response, 400);
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
        const content = FunctionMapStructure(contentOptions);
        const imageSourceOptions = { content, format, quality, height, width };
        const imageSource = await FunctionMapImage(imageSourceOptions);
        return FunctionResponse(response, imageSource);
    }
    return;
};

export default EndpointApiMap;