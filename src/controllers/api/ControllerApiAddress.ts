import { ServerResponse } from "node:http";

import type { TypeGenericRequest } from "../../types/TypeGeneric";

import ServicePuppeteerAddress from "../../services/puppeteer/ServicePuppeteerAddress";

import UtilToolResponse from "../../utils/tools/UtilToolResponse";
import UtilSchemaAddress from "../../utils/schemas/UtilSchemaAddress";
import UtilFunctionQuery from "../../utils/functions/UtilFunctionQuery";
import UtilToolResponseError from "../../utils/tools/UtilToolResponseError";
import UtilFunctionContent from "../../utils/functions/UtilFunctionContent";

const ControllerImgIcon = async function (request: TypeGenericRequest, response: ServerResponse): Promise<void> {
    const { url, data } = request;
    if (!data.routeUrl || typeof data.routeUrl !== "string") {
        return UtilToolResponseError(response, "no route url");
    }
    const { routeUrl } = data;
    const queries = UtilFunctionQuery(url, routeUrl);
    if (typeof queries === "string") {
        return UtilToolResponseError(response, queries, true);
    }
    const queriesParsed = UtilSchemaAddress(queries);
    if (typeof queriesParsed === "string") {
        return UtilToolResponseError(response, queriesParsed, true);
    }
    const { latitude, longitude } = queriesParsed;
    const result = await ServicePuppeteerAddress({ latitude, longitude });
    const content = UtilFunctionContent(200, url, result);
    return UtilToolResponse(response, content, 200);
};

export default ControllerImgIcon;