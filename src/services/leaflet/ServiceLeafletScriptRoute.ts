const ServiceLeafletScriptRoute = function (positions: string, color: string, pointA: string, pointB: string): string {
    const script = `
        const positions = ${positions};
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
    return script;
};

export default ServiceLeafletScriptRoute;