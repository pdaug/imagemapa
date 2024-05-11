const ServiceLeafletScriptIcon = function (latitude: number, longitude: number, zoom: number, icon: string, size: number): string {
    const script = `
        const map = L.map("map", {
            zoomControl: false,
            attributionControl: false,
        });
        map.setView([${latitude},${longitude}], ${zoom});
        L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
            maxZoom: 20,
            subdomains: [ "mt0", "mt1", "mt2", "mt3" ],
        }).addTo(map);
        const newIcon = L.icon({
            iconUrl: "${icon}",
            iconSize: [${size}, ${size}],
            iconAnchor: [${Math.round(size/2)}, ${size}],
        });
        L.marker([${latitude}, ${longitude}], {
            icon: newIcon,
        }).addTo(map);
    `;
    return script;
};

export default ServiceLeafletScriptIcon;