import UtilValidatorPosition from "../validators/UtilValidatorPosition";
import type { TypeGenericPosition, TypeGenericPositions } from "../../types/TypeGeneric";

const UtilFunctionPosition = function (pos: string): TypeGenericPositions | null {
    if (!pos) {
        return null;
    }
    const positionSplitter = ",";
    const positionsSplitter = ";";
    const positions = pos.split(positionsSplitter);
    const positionParsed = new Array<TypeGenericPosition>();
    for (const position of positions) {
        if (!position) {
            continue;
        }
        const [latitudeString, longitudeString] = position.split(positionSplitter);
        const result = UtilValidatorPosition(latitudeString, longitudeString);
        if (!result) {
            return null;
        }
        const { latitude, longitude } = result;
        positionParsed.push([latitude, longitude]);
    }
    return positionParsed;
};

export default UtilFunctionPosition;