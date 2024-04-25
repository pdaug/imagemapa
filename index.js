import puppeteer from "puppeteer";
import { createServer } from "node:http";

const MapElement = function (height = 480, width = 640, style, positions) {
    const isMapStyleValid = (style === "route" || style === "park");
    if (!isMapStyleValid) {
        const message = "<h1>The map style is not valid!</h1>";
        return message;
    }
    const isMapDimensionsValid = (
        !isNaN(height) &&
        !isNaN(width) &&
        isFinite(height) &&
        isFinite(width) &&
        height > 100 &&
        width > 100 &&
        height < 1000 &&
        width < 1000
    );
    if (!isMapDimensionsValid) {
        const message = "<h1>The map dimensions is not valid!</h1>";
        return message;
    }
    const isStructurePositionsValid = (
        Boolean(positions) &&
        Array.isArray(positions) &&
        positions.length > 1
    );
    const isValuesPositionsValid = positions.every(function(position) {
        const latitude = position[0];
        const longitude = position[1];
        const isLatitudeValid = (
            Boolean(latitude) &&
            !isNaN(latitude) &&
            isFinite(latitude) &&
            latitude >= -90 &&
            latitude <= 90
        );
        const isLongitudeValid = (
            Boolean(longitude) &&
            !isNaN(longitude) &&
            isFinite(longitude) &&
            longitude >= -180 &&
            longitude <= 180
        );
        return (isLatitudeValid && isLongitudeValid);
    });
    if (!isStructurePositionsValid && !isValuesPositionsValid) {
        const message = "<h1>Some position is not valid!</h1>";
        return message;
    }
    const positionsJson = JSON.stringify(positions);
    const scriptStyle = {
        route: `
            const polyline = L.polyline(positions, { 
                color: "#222", 
                weight: 6,
            }).addTo(map);
            L.circleMarker(positions[0], { 
                radius: 16,
                color: "#222",
                weight: 6,
                opacity: 1,
                fill: true,
                fillColor: "#fff",
                fillOpacity: 1,
            }).addTo(map);
            L.tooltip(positions[0], {
                content: "1",
                direction: "center",
                opacity: 1,
                className: "leaflet-tooltip-transparent",
            }).addTo(map);
            L.circleMarker(positions[positions.length - 1], { 
                radius: 16,
                color: "#222",
                weight: 6,
                opacity: 1,
                fill: true,
                fillColor: "#fff",
                fillOpacity: 1,
            }).addTo(map);
            L.tooltip(positions[positions.length - 1], {
                content: "2",
                direction: "center",
                opacity: 1,
                className: "leaflet-tooltip-transparent",
            }).addTo(map);
            map.fitBounds(polyline.getBounds());
        `,
        park: `
            L.circleMarker(positions[0], {
                radius: 24,
                color: "#f00",
                weight: 6,
                opacity: 1,
                fill: true,
                fillColor: "#fff",
                fillOpacity: 1,
            }).addTo(map);
            L.tooltip(positions[0], {
                content: "E",
                direction: "center",
                opacity: 1,
                className: "leaflet-tooltip-transparent",
            }).addTo(map);
        `,
    };
    const structure = `
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
            <style>
                body { margin: 0; }
                #map { height: ${height}px; width: ${width}px; }
                .leaflet-tooltip-transparent { appearance: none !important; background: transparent !important; border: none !important; box-shadow: none !important; font-size: 14pt; margin: 0px !important; padding: 0px !important; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                const positions = ${positionsJson};
                const map = L.map("map", {
                    zoomControl: false,
                    attributionControl: false,
                });
                map.setView(positions[0], 18);
                L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
                    maxZoom: 20,
                    subdomains:[ "mt0", "mt1", "mt2", "mt3" ],
                }).addTo(map);
                ${scriptStyle[style]}
            </script>
        </body>
    </html>
    `;
    return structure;
};

const server = createServer(async function (request, response) {
    const width = 640;
    const height = 480;
    const teste = request.url;
    console.log(teste);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ height, width, });
    const htmlContent = MapElement(height, width, "park", [
        [-19.959293, -44.138244],
        [-19.957927, -44.137344],
        [-19.957738, -44.137182],
        [-19.957135, -44.137087],
        [-19.956098, -44.129189],
        [-19.957607, -44.119877],
        [-19.955892, -44.111074],
        [-19.956044, -44.101197],
        [-19.958071, -44.092322],
        [-19.959859, -44.082986],
        [-19.959108, -44.080752],
        [-19.957706, -44.07858],
        [-19.959092, -44.069114],
        [-19.958474, -44.059277],
        [-19.960425, -44.052622],
        [-19.964299, -44.044221],
        [-19.960533, -44.035571],
        [-19.956529, -44.027037],
        [-19.952489, -44.018262],
        [-19.948852, -44.010304],
        [-19.952489, -44.018262],
        [-19.948344, -44.009065],
        [-19.948508, -44.008943],
        [-19.953414, -44.006192],
        [-19.96059, -44.000543],
        [-19.967782, -43.995047],
        [-19.974619, -43.988959],
        [-19.978405, -43.987133],
        [-19.984457, -43.980568],
        [-19.988622, -43.972183],
        [-19.991398, -43.968503],
        [-19.991647, -43.962314]
    ]);
    await page.setContent(htmlContent, {
        waitUntil: "networkidle2",
    });
    const result = await page.screenshot({
        type: "jpeg",
        quality: 70,
    });
    response.write(result);
    response.end();
    await browser.close();
    return;
});

server.listen(8080, "localhost", function () {
    console.log("SERVER IS RUNNING <http://localhost:8080/>");
});