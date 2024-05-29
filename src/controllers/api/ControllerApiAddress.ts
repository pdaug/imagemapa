import { ServerResponse } from "node:http";

import type { TypeGenericRequest } from "src/types/TypeGeneric";

import UtilToolResponse from "../../utils/tools/UtilToolResponse";
import UtilSchemaAddress from "../../utils/schemas/UtilSchemaAddress";
import UtilToolResponseError from "../../utils/tools/UtilToolResponseError";

import ServicePuppeteerAddress from "../../services/puppeteer/ServicePuppeteerAddress";

const ControllerImgIcon = async function (request: TypeGenericRequest, response: ServerResponse): Promise<void> {
    const { url, data } = request;
    if (!data.routeUrl) {
        return UtilToolResponseError(response, "no route url")
    }
    const routeUrl = String(data.routeUrl);
    const queryString = UtilSchemaAddress(url, routeUrl);
    if (typeof queryString === "string") {
        return UtilToolResponseError(response, queryString, true);
    }
    const { latitude, longitude } = queryString;
    const result = await ServicePuppeteerAddress({ latitude, longitude });
    const content = {
        version: 1,
        server: "imagemapa-1",
        status: "success",
        code: 200,
        message: "Ok",
        path: request.url,
        result,
        timestamp: Date.now(),
    };
    return UtilToolResponse(response, content, 200);
};

export default ControllerImgIcon;