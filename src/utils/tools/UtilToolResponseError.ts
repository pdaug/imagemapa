import { ServerResponse } from "node:http";

import type { TypeQueryStringFormat } from "src/types/TypeQueryString";

import ServiceHtml from "../../services/html/ServiceHtml";
import ServicePuppeteer from "../../services/puppeteer/ServicePuppeteer";
import ServiceHtmlElement from "../../services/html/ServiceHtmlElement";

const UtilToolResponseErrorElement = function (content: string): string {
    const style = `
        body { 
            align-items: center;
            display: flex;
            height: 480px;
            font-family: monospace;
            justify-content: center;
            margin: 0;
            width: 640px;
        }
    `;
    const document = ServiceHtml({
        head: [ 
            ServiceHtmlElement({ tag: "title", children: "imagemapa" }), 
            ServiceHtmlElement({ tag: "style", children: style }),
        ],
        body: [ ServiceHtmlElement({ tag: "div", children: content }) ],
    });
    return document;
};

const UtilToolResponseErrorImage = async function (content: string): Promise<Buffer> {
    const format: TypeQueryStringFormat = "jpg";
    const quality = 70;
    const width = 640;
    const height = 480;
    const imageSourceOptions = { content, format, quality, height, width };
    const imageSource = await ServicePuppeteer(imageSourceOptions);
    return imageSource;
};

const UtilToolResponseError = async function (response: ServerResponse, content: string, image?: boolean): Promise<void> {
    const document = UtilToolResponseErrorElement(content);
    if (image) {
        const imageSource = await UtilToolResponseErrorImage(document);
        response.statusCode = 400;
        response.setHeader("Content-Type", "image/jpeg");
        response.write(imageSource);
        response.end();
        return;
    }
    response.statusCode = 400;
    response.setHeader("Content-Type", "text/html");
    response.write(document);
    response.end();
    return;
};

export default UtilToolResponseError;