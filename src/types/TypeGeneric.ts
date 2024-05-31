import { IncomingMessage } from "node:http";

export type TypeGenericObject = Record<string, string | number | boolean>;

export type TypeGenericPosition = [number, number];

export type TypeGenericPositions = TypeGenericPosition[];

export type TypeGenericRequest = IncomingMessage & {
    data: TypeGenericObject;
};

export type TypeGenericResponseStatus = "success" | "error";

export type TypeGenericResponseCode = 200 | 201 | 204 | 400 | 401 | 404 | 405 | 500;

export type TypeGenericResponse = {
    version: number;
    server: string;
    status: TypeGenericResponseStatus;
    code: TypeGenericResponseCode;
    message: string;
    path: string;
    result: unknown;
    timestamp: number;
};