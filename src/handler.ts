import { IncomingMessage, ServerResponse } from "node:http";

import RouteMap from "./routes/RouteMap";
import FunctionResponse from "./functions/FunctionResponse";
import FunctionGetParams from "./functions/FunctionGetParams";
import FunctionGenerateImage from "./functions/FunctionGenerateImage";

const Handler = async function (request: IncomingMessage, response: ServerResponse) {
    if (request.method !== "GET") {
        return FunctionResponse(response, 405);
    }
    const params = FunctionGetParams(request.url);
    if (!params) {
        return FunctionResponse(response, 400);
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
    return FunctionResponse(response, imageSource);
};

export default Handler;