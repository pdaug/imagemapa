import { IncomingMessage, ServerResponse } from "node:http";

import FunctionResponse from "../functions/FunctionResponse";
import FunctionMapStructure from "../functions/FunctionMapStructure";
import FunctionGenerateImage from "../functions/FunctionGenerateImage";
import FunctionQueryStringRoute from "../functions/FunctionQueryStringRoute";

export const EndpointRouteMethod = "GET";
export const EndpointRouteUrl = "/api/route/";

const EndpointRoute = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url, method } = request;
    const isEndpoint = url.includes(EndpointRouteUrl);
    const isMethod = (method === EndpointRouteMethod);
    if (isEndpoint && isMethod) {
        const queryString = FunctionQueryStringRoute(url);
        if (!queryString) {
            return FunctionResponse(response, 400);
        }
        const { positions, pointA, pointB, color, format, quality, height, width } = queryString;
        const positionsStringified = JSON.stringify(positions);
        const script = `
        <script>
            const positions = ${positionsStringified};
            const firstPositions = positions[0];
            const lastPositions = positions[positions.length - 1];
            
            const map = L.map("map", {
                zoomControl: false,
                attributionControl: false,
            });
            L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
                maxZoom: 20,
                subdomains:[ "mt0", "mt1", "mt2", "mt3" ],
            }).addTo(map);

            const polyline = L.polyline(positions, { 
                color: "${color}", 
                weight: 6,
            }).addTo(map);

            L.circleMarker(firstPositions, { 
                radius: 16,
                color: "${color}",
                weight: 6,
                opacity: 1,
                fill: true,
                fillColor: "white",
                fillOpacity: 1,
            }).addTo(map);
            L.tooltip(firstPositions, {
                content: "${pointA}",
                direction: "center",
                opacity: 1,
                className: "leaflet-tooltip-transparent",
            }).addTo(map);

            L.circleMarker(lastPositions, { 
                radius: 16,
                color: "${color}",
                weight: 6,
                opacity: 1,
                fill: true,
                fillColor: "white",
                fillOpacity: 1,
            }).addTo(map);
            L.tooltip(lastPositions, {
                content: "${pointB}",
                direction: "center",
                opacity: 1,
                className: "leaflet-tooltip-transparent",
            }).addTo(map);

            map.fitBounds(polyline.getBounds());
        </script>`;
        console.log(script);
        const mapStructure = { script, height, width };
        const content = FunctionMapStructure(mapStructure);
        const generateImage = { content, format, quality, height, width };
        const imageSource = await FunctionGenerateImage(generateImage);
        return FunctionResponse(response, imageSource);
    }
    return;
};

export default EndpointRoute;