import puppeteer from "puppeteer";

import { TypeQueryStringFormat } from "../../types/TypeQueryString";

type ServicePuppeteerParameters = {
    content: string;
    format: TypeQueryStringFormat;
    quality: number;
    height: number;
    width: number;
}

const ServicePuppeteer = async function ({ content, format, quality, height, width }: ServicePuppeteerParameters): Promise<Buffer> {
    const type = (format === "jpg") ? "jpeg" : format;
    const waitUntil = "networkidle0";
    const dimensions = { height, width };
    const browserConfig = { headless: true };
    const browser = await puppeteer.launch(browserConfig);
    const page = await browser.newPage();
    await page.setViewport(dimensions);
    await page.setContent(content, { waitUntil });
    const result = await page.screenshot((type === "jpeg") ? { type, quality } : { type });
    return result;
};

export default ServicePuppeteer;