const ConfigDefaultPort = 8080;
const ConfigDefaultHost = "127.0.0.1";

const Config = {
    protocolSecure: false,
    protocol: function () {
        const protocol = (this.protocolSecure) ? "https" : "http";
        return protocol;
    },

    host: (process.env.SERVER_HOST) ? process.env.SERVER_HOST : ConfigDefaultHost,
    port: (process.env.SERVER_HOST) ? parseInt(process.env.SERVER_PORT) : ConfigDefaultPort,
    
    url: function () {
        const protocol = this.protocol();
        const url = `${protocol}://${this.host}:${this.port}`;
        return url;
    },
};

export default Config;