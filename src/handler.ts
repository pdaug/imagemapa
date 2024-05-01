import { IncomingMessage, ServerResponse } from "node:http";

import EndpointApiMap from "./endpoints/api/EndpointApiMap";
import EndpointApiIcon from "./endpoints/api/EndpointApiIcon";
import EndpointApiRoute from "./endpoints/api/EndpointApiRoute";

const Handler = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    EndpointApiMap(request, response);
    EndpointApiIcon(request, response);
    EndpointApiRoute(request, response);
    return;
};

export default Handler;