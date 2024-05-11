type ServiceHtmlElementParameters = {
    tag: string;
    close?: boolean;
    attributes?: Record<string, string>;
    children?: string;
};

export const ServiceHtmlElement = function ({ tag, close, attributes, children }: ServiceHtmlElementParameters): string {
    const attributesEntries = Object.entries(attributes || new Object());
    const attributesConverted = attributesEntries.map(function ([key, value]) {
        const attribute = `${key}="${value}"`;
        return attribute;
    });
    const attributeJoinned = attributesConverted.join(" ");
    const element = (children || close) ?
        `<${tag} ${attributeJoinned}>
            ${children || ""}
        </${tag}>`
        :
        `<${tag} ${attributeJoinned} />`;
    return element;
};

export default ServiceHtmlElement;