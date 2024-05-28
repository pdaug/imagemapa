import { IncomingMessage } from "node:http";

export type TypeGenericObjectUnkownValues = {
    [key: string]: unknown;
};

export type TypeGenericObjectOptionalValues = { 
    [key: string]: string | undefined;
};

export type TypeGenericPosition = [number, number];

export type TypeGenericPositions = TypeGenericPosition[];

export type TypeGenericRequest = IncomingMessage & {
    data: TypeGenericObjectUnkownValues;
};