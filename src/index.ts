import { createServer } from "node:http";

import Handler from "./handler";

const server = createServer(Handler);
const port = (process.env.SERVER_PORT) ? parseInt(process.env.SERVER_PORT) : 8080;

server.listen(port);