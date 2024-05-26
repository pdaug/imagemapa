import { IncomingMessage, ServerResponse } from "node:http";

import ControllerEmbedMap from "../controllers/embed/ControllerEmbedMap";

import ControllerApiMap from "../controllers/api/ControllerApiMap";
import ControllerApiIcon from "../controllers/api/ControllerApiIcon";
import ControllerApiRoute from "../controllers/api/ControllerApiRoute";

import ControllerSource from "../controllers/source/ControllerSource";

import ControllerErrorNotFound from "../controllers/errors/ControllerErrorNotFound";

const Routes = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {

    ControllerEmbedMap(request, response);

    ControllerApiMap(request, response);
    ControllerApiIcon(request, response);
    ControllerApiRoute(request, response);

    ControllerSource(request, response);

    ControllerErrorNotFound(request, response);

    return;
};

export default Routes;