import FunctionMapStructure from "../functions/FunctionMapStructure";

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
    const mapStructure = FunctionMapStructure({
        script,
        height,
        width,
    });
    return mapStructure;
};

export default RouteMap;