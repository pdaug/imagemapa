import { IncomingMessage, ServerResponse } from "node:http";

import type { TypeGenericObjectUnkownValues } from "src/types/TypeGeneric";

import ControllerEmbedMap from "../controllers/embed/ControllerEmbedMap";
import ControllerImgIcon from "../controllers/img/ControllerImgIcon";
import ControllerImgMap from "../controllers/img/ControllerImgMap";
import ControllerImgRoute from "../controllers/img/ControllerImgRoute";
import ControllerSource from "../controllers/source/ControllerSource";
import ControllerApiAddress from "../controllers/api/ControllerApiAddress";

import UtilToolRoute from "../utils/tools/UtilToolRoute";
import UtilToolNotFound from "../utils/tools/UtilToolNotFound";

const Routes = async function (request: IncomingMessage, response: ServerResponse): Promise<void> {

    const data = new Object() as TypeGenericObjectUnkownValues;
    const newRequest = Object.assign(request, { data });

    UtilToolRoute("GET", "/embed/map", newRequest, response, ControllerEmbedMap);

    UtilToolRoute("GET", "/img/map", newRequest, response, ControllerImgMap);
    UtilToolRoute("GET", "/img/icon", newRequest, response, ControllerImgIcon);
    UtilToolRoute("GET", "/img/route", newRequest, response, ControllerImgRoute);

    UtilToolRoute("GET", "/api/address", newRequest, response, ControllerApiAddress);

    UtilToolRoute("GET", "*", newRequest, response, ControllerSource);
    UtilToolNotFound(newRequest, response);

    return;
};

export default Routes;