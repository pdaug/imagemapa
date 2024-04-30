import { IncomingMessage, ServerResponse } from "node:http";

const Handler = async function (request: IncomingMessage, response: ServerResponse) {
    if (request.method !== "GET") {
        response.statusCode = 405;
        response.write("Method Not Allowed");
        response.end();
        return;
    }
    response.statusCode = 200;
    response.write("Ok");
    response.end();
    return;
};

export default Handler;