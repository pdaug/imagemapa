import { IncomingMessage, ServerResponse } from "node:http";

import UtilToolResponse from "../../utils/tools/UtilToolResponse";
import ServicePuppeteer from "../../services/puppeteer/ServicePuppeteer";
import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import UtilSchemaRoute from "../../utils/schemas/UtilSchemaRoute";

export const ControllerApiRouteMethod = "GET";
export const ControllerApiRouteUrl = "/api/route";

const ControllerApiRoute = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url, method } = request;
    const isController = url.includes(ControllerApiRouteUrl);
    const isMethod = (method === ControllerApiRouteMethod);
    if (isController && isMethod) {
        const queryString = UtilSchemaRoute(url, ControllerApiRouteUrl);
        if (!queryString) {
            return UtilToolResponse(response, 400);
        }
        const { positions, pointA, pointB, color, format, quality, height, width } = queryString;
        const positionsStringified = JSON.stringify(positions);
        const script = `
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
        `;
        const contentOptions = { script, height, width };
        const content = ServiceLeaflet(contentOptions);
        const imageSourceOptions = { content, format, quality, height, width };
        const imageSource = await ServicePuppeteer(imageSourceOptions);
        return UtilToolResponse(response, imageSource);
    }
    return;
};

export default ControllerApiRoute;