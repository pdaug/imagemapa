import { createServer } from "node:http";

import Config from "./config";
import Routes from "./routes";

const server = createServer(Routes);

server.listen(Config.port, Config.host, function () {
    console.log(`SERVER IS RUNNING ON: ${Config.url()}`);
});