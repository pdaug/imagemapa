import { IncomingMessage, ServerResponse } from "node:http";

import type { TypeGenericObjectUnkownValues } from "src/types/TypeGeneric";

import ControllerEmbedMap from "../controllers/embed/ControllerEmbedMap";
import ControllerApiMap from "../controllers/api/ControllerApiMap";
import ControllerApiIcon from "../controllers/api/ControllerApiIcon";
import ControllerApiRoute from "../controllers/api/ControllerApiRoute";
import ControllerSource from "../controllers/source/ControllerSource";

import UtilToolRoute from "../utils/tools/UtilToolRoute";
import UtilToolNotFound from "../utils/tools/UtilToolNotFound";

const Routes = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {

    const data = new Object() as TypeGenericObjectUnkownValues;
    const newRequest = Object.assign(request, { data });

    UtilToolRoute("GET", "/embed/map", newRequest, response, ControllerEmbedMap);

    UtilToolRoute("GET", "/api/map", newRequest, response, ControllerApiMap);
    UtilToolRoute("GET", "/api/icon", newRequest, response, ControllerApiIcon);
    UtilToolRoute("GET", "/api/route", newRequest, response, ControllerApiRoute);

    UtilToolRoute("GET", "*", newRequest, response, ControllerSource);
    UtilToolNotFound(newRequest, response);

    return;
};

export default Routes;