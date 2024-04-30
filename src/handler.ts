import { IncomingMessage, ServerResponse } from "node:http";

import RouteMap from "./routes/RouteMap";
import FunctionGetParams from "./functions/FunctionGetParams";
import FunctionGenerateImage from "./functions/FunctionGenerateImage";

const Handler = async function (request: IncomingMessage, response: ServerResponse) {
    if (request.method !== "GET") {
        response.statusCode = 405;
        response.write("Method Not Allowed");
        response.end();
        return;
    }
    const params = FunctionGetParams(request.url);
    if (!params) {
        response.statusCode = 400;
        response.write("Bad Request");
        response.end();
        return;
    }
    const mapStructure = RouteMap({
        latitude: params.latitude,
        longitude: params.longitude,
        zoom: params.zoom,
        height: params.height,
        width: params.width
    });
    const imageSource = await FunctionGenerateImage({
        content: mapStructure,
        format: params.format,
        quality: params.quality,
        height: params.height,
        width: params.width,
    });
    response.statusCode = 200;
    response.end(imageSource);
    return;
};

export default Handler;