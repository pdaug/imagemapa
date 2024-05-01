import FunctionNormalizePosition from "./FunctionNormalizePosition";
import type { TypeGenericPosition, TypeGenericPositions } from "../types/TypeGeneric";

const FunctionTransformPositions = function (pos: string): TypeGenericPositions | null {
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
        console.log(position);
        const [latitudeString, longitudeString] = position.split(positionSplitter);
        const result = FunctionNormalizePosition(latitudeString, longitudeString);
        if (!result) {
            return null;
        }
        const { latitude, longitude } = result;
        positionParsed.push([latitude, longitude]);
    }
    return positionParsed;
};

export default FunctionTransformPositions;