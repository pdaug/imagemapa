import { readFile } from "node:fs/promises";
import { IncomingMessage, ServerResponse } from "node:http";

import UtilFunctionResponse from "../../utils/tools/UtilToolResponse";

const ControllerSourceFiles = [
    {
        method: "GET",
        url: "/leaflet/style.css",
        contentType: "text/css",
        path: "./public/leaflet/style.css",
    },
    {
        method: "GET",
        url: "/leaflet/script.js",
        contentType: "text/javascript",
        path: "./public/leaflet/script.js",
    }
];

const ControllerSource = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    const { url, method } = request;
    for (const file of ControllerSourceFiles) {
        const isRoute = (url === file.url);
        const isMethod = (method === file.method);
        if (isRoute && isMethod) {
            const { contentType } = file;
            const content = await readFile(file.path);
            UtilFunctionResponse(response, content, 200, contentType)
            return;
        }
    }
    return;
};

export default ControllerSource;