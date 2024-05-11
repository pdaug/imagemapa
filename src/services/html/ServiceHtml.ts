type ServiceHtmlParameters = {
    head: string[];
    body: string[];
};

const ServiceHtml = function ({ head, body }: ServiceHtmlParameters): string {
    const document = `
    <!DOCTYPE html>
    <html>
        <head>
            ${head.join("\n")}
        </head>
        <body>
            ${body.join(" ")}
        </body>
    </html>
    `;
    return document;
};

export default ServiceHtml;