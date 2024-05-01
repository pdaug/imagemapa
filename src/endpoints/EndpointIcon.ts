import { IncomingMessage, ServerResponse } from "node:http";

import FunctionResponse from "../functions/FunctionResponse";
import FunctionMapStructure from "../functions/FunctionMapStructure";
import FunctionGenerateImage from "../functions/FunctionGenerateImage";
import FunctionQueryStringIcon from "../functions/FunctionQueryStringIcon";

export const EndpointIconMethod = "GET";
export const EndpointIconUrl = "/api/icon/";

const EndpointIcon = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url, method } = request;
    const isEndpoint = url.includes(EndpointIconUrl);
    const isMethod = (method === EndpointIconMethod);
    if (isEndpoint && isMethod) {
        const queryString = FunctionQueryStringIcon(url);
        if (!queryString) {
            return FunctionResponse(response, 400);
        }
        const { latitude, longitude, zoom, icon, size, format, quality, height, width } = queryString;
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

            const newIcon = L.icon({
                iconUrl: "${icon}",
                iconSize:     [${size}, ${size}],
                iconAnchor:   [${Math.round(size/2)}, ${size}],
            });

            L.marker([${latitude}, ${longitude}], {
                icon: newIcon,
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

export default EndpointIcon;