import UtilFunctionPosition from "../../src/utils/functions/UtilFunctionPosition";

test("Should convert the string positions in array", function() {
    const positionsArray = [ [1,2], [2,3] ];
    const positionsString = "1,2;2,3";
    const positionsParsed = UtilFunctionPosition(positionsString);
    expect(positionsParsed).toEqual(positionsArray);
});

test("Should not convert because invalid positions", function () {
    const error = "list has an invalid position";
    const positionsString = "1,2;2";
    const positionsParsed = UtilFunctionPosition(positionsString);
    expect(positionsParsed).toEqual(error);
});

test("Should not convert because invalid string", function () {
    const error = "invalid positions";
    const positionsString = "";
    const positionsParsed = UtilFunctionPosition(positionsString);
    expect(positionsParsed).toEqual(error);
});

// jest ./test/unit/UtilFunctionPosition.test.ts