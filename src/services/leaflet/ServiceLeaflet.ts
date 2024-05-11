import Config from "../../config";
import ConfigLeaflet from "../../config/ConfigLeaflet";

import ServiceHtml from "../html/ServiceHtml";
import ServiceHtmlElement from "../html/ServiceHtmlElement";

type ServiceLeafletParameters = {
    script: string;
    height?: number;
    width?: number;
};

const ServiceLeaflet = function ({ script, height, width }: ServiceLeafletParameters): string {
    const { url } = Config;
    const style = `
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
    `;
    const document = ServiceHtml({
        head: [
            ServiceHtmlElement({ tag: "title", children: "imagemapa" }),
            ServiceHtmlElement({ tag: "link", attributes: { rel: "stylesheet", href: `${url}/leaflet/style.css` } }),
            ServiceHtmlElement({ tag: "style", children: style }),
            ServiceHtmlElement({ tag: "script", attributes: { src: `${url}/leaflet/script.js` }, close: true }),
        ],
        body: [
            ServiceHtmlElement({ tag: "div", attributes: { id: "map" }, close: true }),
            ServiceHtmlElement({ tag: "script", children: script }),
        ],
    });
    return document;
};

export default ServiceLeaflet;