import UtilValidatorPosition from "../validators/UtilValidatorPosition";
import type { TypeGenericPosition, TypeGenericPositions } from "../../types/TypeGeneric";

const UtilFunctionPosition = function (positions: unknown): TypeGenericPositions | string {
    if (!positions || typeof positions !== "string") {
        return "invalid positions";
    }
    const oneSplitter = ",";
    const multipleSplitter = ";";
    const positionsSplitted = positions.split(multipleSplitter);
    const positionsParsed = new Array<TypeGenericPosition>();
    for (const position of positionsSplitted) {
        if (!position) {
            continue;
        }
        const [latitudeString, longitudeString] = position.split(oneSplitter);
        const result = UtilValidatorPosition(latitudeString, longitudeString);
        if (typeof result === "string") {
            return "list has an invalid position";
        }
        const { latitude, longitude } = result;
        positionsParsed.push([latitude, longitude]);
    }
    return positionsParsed;
};

export default UtilFunctionPosition;