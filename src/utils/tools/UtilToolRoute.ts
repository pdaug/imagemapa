import { IncomingMessage, ServerResponse } from "node:http";

import type { TypeGenericRequest } from "src/types/TypeGeneric";

type UtilToolRouteMethod = "GET" | "POST" | "DELETE" | "PUT";

const UtilToolRoute = async function (routeMethod: UtilToolRouteMethod, routeUrl: string, request: TypeGenericRequest, response: ServerResponse, func: (request: IncomingMessage, response: ServerResponse) => Promise<void>): Promise<void> {
    const { url, method } = request;
    const isRouteMethod = (method === routeMethod);
    if (routeUrl === "*") {
        await func(request, response);
        return;
    }
    const isRouteUrl = url.includes(routeUrl);
    if (isRouteUrl && isRouteMethod) {
        request.data.routeUrl = routeUrl;
        await func(request, response);
        return;
    }
    return;
};

export default UtilToolRoute;