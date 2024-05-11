import Config from "../../config";
import ConfigLeaflet from "../../config/ConfigLeaflet";

type ServiceLeafletParameters = {
    script: string;
    height?: number;
    width?: number;
};

const ServiceLeaflet = function ({ script, height, width }: ServiceLeafletParameters): string {
    const url = Config.url();
    const source = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>imagemapa</title>
            <link rel="stylesheet" href="${url}/leaflet/style.css" />
            <style>
                body { 
                    margin: 0; 
                }
                #map { 
                    height: ${(height) ? `${height}px` : ConfigLeaflet.heightDefault}; 
                    width: ${(width) ? `${width}px` : ConfigLeaflet.widthDefault}; 
                }
                .leaflet-tooltip-transparent { 
                    appearance: none !important; 
                    background: transparent !important; 
                    border: none !important; 
                    box-shadow: none !important; 
                    font-size: 14pt; 
                    margin: 0px !important; 
                    padding: 0px !important; 
                }
            </style>
            <script src="${url}/leaflet/script.js"></script>
        </head>
        <body>
            <div id="map"></div>
            <script>${script}</script>
        </body>
    </html>`;
    return source;
};

export default ServiceLeaflet;