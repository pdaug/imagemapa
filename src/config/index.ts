import { version, name as server } from "../../package.json";

const secure = Boolean(process.env.SERVER_SECURE);
const protocol = (secure) ? "https" : "http";

const hostDefault = "localhost";
const host = (process.env.SERVER_HOST) ? process.env.SERVER_HOST : hostDefault;

const portDefault = 8080;
const port = (process.env.SERVER_HOST) ? parseInt(process.env.SERVER_PORT) : portDefault;

const url = `${protocol}://${host}:${port}`;

const versionFloated = parseFloat(version);

const Config = { version: versionFloated, server, secure, protocol, host, port, url };

export default Config;
