import { ServerResponse } from "node:http";

const MiddlewareCorsDays = 7;
const MiddlewareCorsDaysInMilliseconds = MiddlewareCorsDays * 60 * 60 * 1000;

const MiddlewareCors = function (response: ServerResponse): ServerResponse {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", [ "GET", "POST" ]);
    response.setHeader("Access-Control-Allow-Max-Age", MiddlewareCorsDaysInMilliseconds);
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return response;
};

export default MiddlewareCors;