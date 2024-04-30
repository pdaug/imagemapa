import { TypeParamsFormat } from "@/types/TypeParams";
import puppeteer from "puppeteer";

type FunctionGenerateImageProps = {
    content: string;
    format: TypeParamsFormat;
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
    const result = await page.screenshot({ type, quality });
    return result;
};

export default FunctionGenerateImage;