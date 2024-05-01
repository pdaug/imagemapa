import puppeteer from "puppeteer";

import { TypeQueryStringFormat } from "../types/TypeQueryString";

type FunctionGenerateImageProps = {
    content: string;
    format: TypeQueryStringFormat;
    quality: number;
    height: number;
    width: number;
}

const FunctionGenerateImage = async function ({
    content,
    format,
    quality,
    height,
    width,
}: FunctionGenerateImageProps): Promise<Buffer> {
    const type = (format === "jpg") ? "jpeg" : format;
    const waitUntil = "networkidle2";
    const dimensions = { height, width };
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport(dimensions);
    await page.setContent(content, { waitUntil });
    const result = await page.screenshot((type === "jpeg") ? { type, quality } : { type });
    return result;
};

export default FunctionGenerateImage;