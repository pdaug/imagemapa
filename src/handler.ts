import { IncomingMessage, ServerResponse } from "node:http";

import EndpointMap from "./endpoints/EndpointMap";
import EndpointIcon from "./endpoints/EndpointIcon";
import EndpointRoute from "./endpoints/EndpointRoute";

const Handler = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {
    EndpointMap(request, response);
    EndpointIcon(request, response);
    EndpointRoute(request, response);
    return;
};

export default Handler;