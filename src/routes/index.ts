import { IncomingMessage, ServerResponse } from "node:http";

import { TypeGenericObject } from "../types/TypeGeneric";

import MiddlewareCors from "../middleware/MiddlewareCors";

import UtilToolRoute from "../utils/tools/UtilToolRoute";
import UtilToolNotFound from "../utils/tools/UtilToolNotFound";

import ControllerEmbedMap from "../controllers/embed/ControllerEmbedMap";
import ControllerImgIcon from "../controllers/img/ControllerImgIcon";
import ControllerImgMap from "../controllers/img/ControllerImgMap";
import ControllerImgRoute from "../controllers/img/ControllerImgRoute";
import ControllerSource from "../controllers/source/ControllerSource";
import ControllerApiAddress from "../controllers/api/ControllerApiAddress";
import ControllerApiStreet from "../controllers/api/ControllerApiStreet";

const Routes = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {

    const data = new Object() as TypeGenericObject;
    const newRequest = Object.assign(request, { data });

    const responseCors = MiddlewareCors(response);

    UtilToolRoute("GET", "/embed/map", newRequest, responseCors, ControllerEmbedMap);

    UtilToolRoute("GET", "/img/map", newRequest, responseCors, ControllerImgMap);
    UtilToolRoute("GET", "/img/icon", newRequest, responseCors, ControllerImgIcon);
    UtilToolRoute("GET", "/img/route", newRequest, responseCors, ControllerImgRoute);

    UtilToolRoute("GET", "/api/address", newRequest, responseCors, ControllerApiAddress);
    UtilToolRoute("GET", "/api/street", newRequest, responseCors, ControllerApiStreet);

    UtilToolRoute("GET", "*", newRequest, responseCors, ControllerSource);

    UtilToolNotFound(newRequest, response);

    return;
};

export default Routes;