type RouteMapProps = {
    latitude: number;
    longitude: number;
    zoom: number;
    height: number;
    width: number;
}

const RouteMap = function ({
    latitude,
    longitude,
    zoom,
    height,
    width,
}: RouteMapProps): string {
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
                const map = L.map("map", {
                    zoomControl: false,
                    attributionControl: false,
                });
                map.setView([${latitude},${longitude}], ${zoom});
                L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
                    maxZoom: 20,
                    subdomains:[ "mt0", "mt1", "mt2", "mt3" ],
                }).addTo(map);
            </script>
        </body>
    </html>`;
    return structure;
};

export default RouteMap;