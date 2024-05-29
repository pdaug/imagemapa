import puppeteer from "puppeteer";

import type { TypeGenericPosition } from "src/types/TypeGeneric";

type ServicePuppeteerAddressParameters = {
    latitude: number;
    longitude: number;
};

type ServicePuppeteerAddressReturn = {
    coordinate: string;
    address: string;
    position: TypeGenericPosition;
    provider: string;
};

const ServicePuppeteerAddressGetUrl = function (latitude: number, longitude: number) {
    const coordinate = `${latitude},${longitude}`;
    const url = `https://www.google.com.br/maps/place/${coordinate}/@${coordinate}`;
    return url;
};

const ServicePuppeteerAddressGetContent = function () { 
    const headElement = document.head;
    const metaElement = headElement.querySelector("meta[itemprop='name']");
    const content = metaElement.getAttribute("content");
    const contentSplitted = content.split("·");
    const coordinate = contentSplitted[0].trim();
    const address = contentSplitted[1].trim();
    return {
        coordinate,
        address,
    };
};

const ServicePuppeteerAddress = async function ({ latitude, longitude }: ServicePuppeteerAddressParameters): Promise<ServicePuppeteerAddressReturn> {
    const browserConfig = { headless: true };
    const browser = await puppeteer.launch(browserConfig);
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    const url = ServicePuppeteerAddressGetUrl(latitude, longitude);
    await page.goto(url);
    const content = await page.evaluate(ServicePuppeteerAddressGetContent);
    const provider = "Google Maps";
    const position = [latitude, longitude] as TypeGenericPosition;
    const result = {
        ...content,
        position,
        provider,
    };
    return result;
};

export default ServicePuppeteerAddress;