type FunctionMapStructureProps = {
    script: string;
    height: number;
    width: number;
};

const FunctionMapStructure = function ({
    script,
    height,
    width,
}: FunctionMapStructureProps): string {
    const mapStructure = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>imagemapa</title>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
            <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
            <style>
                body { margin: 0; }
                #map { height: ${(height) ? `${height}px` : "100vh"}; width: ${(width) ? `${width}px` : "100vw"}; }
                .leaflet-tooltip-transparent { appearance: none !important; background: transparent !important; border: none !important; box-shadow: none !important; font-size: 14pt; margin: 0px !important; padding: 0px !important; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script>
                ${script}
            </script>
        </body>
    </html>`;
    return mapStructure;
};

export default FunctionMapStructure;