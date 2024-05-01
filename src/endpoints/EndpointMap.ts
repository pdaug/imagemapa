import { IncomingMessage, ServerResponse } from "node:http";

import FunctionResponse from "../functions/FunctionResponse";
import FunctionMapStructure from "../functions/FunctionMapStructure";
import FunctionQueryStringMap from "../functions/FunctionQueryStringMap";
import FunctionGenerateImage from "../functions/FunctionGenerateImage";

export const EndpointMapMethod = "GET";
export const EndpointMapUrl = "/api/map/";

const EndpointMap = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url, method } = request;
    const isEndpoint = url.includes(EndpointMapUrl);
    const isMethod = (method === EndpointMapMethod);
    if (isEndpoint && isMethod) {
        const queryString = FunctionQueryStringMap(url);
        if (!queryString) {
            return FunctionResponse(response, 400);
        }
        const { latitude, longitude, zoom, format, quality, height, width } = queryString;
        const script = `
        <script>
            const map = L.map("map", {
                zoomControl: false,
                attributionControl: false,
            });
            map.setView([${latitude},${longitude}], ${zoom});
            L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
                maxZoom: 20,
                subdomains:[ "mt0", "mt1", "mt2", "mt3" ],
            }).addTo(map);
        </script>`;
        const mapStructure = { script, height, width };
        const content = FunctionMapStructure(mapStructure);
        const generateImage = { content, format, quality, height, width };
        const imageSource = await FunctionGenerateImage(generateImage);
        return FunctionResponse(response, imageSource);
    }
    return;
};

export default EndpointMap;