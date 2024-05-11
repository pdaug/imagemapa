const ServiceLeafletScriptMap = function (latitude: number, longitude: number, zoom: number): string {
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
    return script;
};

export default ServiceLeafletScriptMap;