const version = 1.0;
const server = "imagemapa-1";

const secure = Boolean(process.env.SERVER_SECURE);
const protocol = (secure) ? "https" : "http";

const hostDefault = "localhost";
const host = (process.env.SERVER_HOST) ? process.env.SERVER_HOST : hostDefault;

const portDefault = 8080;
const port = (process.env.SERVER_HOST) ? parseInt(process.env.SERVER_PORT) : portDefault;

const url = `${protocol}://${host}:${port}`;

const Config = { version, server, secure, protocol, host, port, url };

export default Config;