import ServiceHtml from "../html/ServiceHtml";
import ServiceHtmlElement from "../html/ServiceHtmlElement";

type ServiceStreetEmbedParameters = {
    latitude: number;
    longitude: number;
    bearing: number;
    tilt: number;
    pitch: number;
};

const ServiceStreetEmbed = function ({ latitude, longitude, bearing, tilt, pitch }: ServiceStreetEmbedParameters): string {
    const frameborder = "0";
    const src = `https://www.google.com/maps?q&layer=c&cbll=${latitude},${longitude}&cbp=11,${bearing},${tilt},0,${pitch}&source=embed&output=svembed`;
    const style = `
        body { margin: 0; padding: 0; }
        iframe { height: 100vh; width: 100vw; padding: 0; }
    `;
    const document = ServiceHtml({
        head: [
            ServiceHtmlElement({ tag: "title", children: "imagemapa" }),
            ServiceHtmlElement({ tag: "style", children: style }),
        ],
        body: [
            ServiceHtmlElement({ tag: "iframe", attributes: { src, frameborder }, close: true }),
        ],
    });
    return document;
};

export default ServiceStreetEmbed;