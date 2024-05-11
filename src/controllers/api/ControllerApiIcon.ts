import { IncomingMessage, ServerResponse } from "node:http";

import UtilToolResponse from "../../utils/tools/UtilToolResponse";
import ServicePuppeteer from "../../services/puppeteer/ServicePuppeteer";
import ServiceLeaflet from "../../services/leaflet/ServiceLeaflet";
import UtilSchemaIcon from "../../utils/schemas/UtilSchemaIcon";

export const ControllerApiIconMethod = "GET";
export const ControllerApiIconUrl = "/api/icon";

const ControllerApiIcon = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url, method } = request;
    const isController = url.includes(ControllerApiIconUrl);
    const isMethod = (method === ControllerApiIconMethod);
    if (isController && isMethod) {
        const queryString = UtilSchemaIcon(url, ControllerApiIconUrl);
        if (!queryString) {
            return UtilToolResponse(response, 400);
        }
        const { latitude, longitude, zoom, icon, size, format, quality, height, width } = queryString;
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

            const newIcon = L.icon({
                iconUrl: "${icon}",
                iconSize:     [${size}, ${size}],
                iconAnchor:   [${Math.round(size/2)}, ${size}],
            });

            L.marker([${latitude}, ${longitude}], {
                icon: newIcon,
            }).addTo(map);
        `;
        const contentOptions = { script, height, width };
        const content = ServiceLeaflet(contentOptions);
        const imageSourceOptions = { content, format, quality, height, width };
        const imageSource = await ServicePuppeteer(imageSourceOptions);
        return UtilToolResponse(response, imageSource);
    }
    return;
};

export default ControllerApiIcon;