import UtilSchemaAddress from "../../src/utils/schemas/UtilSchemaAddress";

test("Should serialize object", function() {
    const queries = {
        lat: 12,
        lng: 34,
    };
    const queryResult = {
        latitude: 12,
        longitude: 34,
    };
    const result = UtilSchemaAddress(queries);
    expect(result).toEqual(queryResult);
});

test("Should not serialize object because has not lat and lng", function() {
    const queries = {};
    const queryString = UtilSchemaAddress(queries);
    expect(queryString).toEqual("type wrong for latitude or longitude");
});

test("Should not serialize object because latitude is invalid", function() {
    const queries = {
        lat: 120,
        lng: 34,
    };
    const queryString = UtilSchemaAddress(queries);
    expect(queryString).toEqual("invalid latitude");
});

test("Should not serialize object because longitude is invalid", function() {
    const queries = {
        lat: 12,
        lng: 340,
    };
    const queryString = UtilSchemaAddress(queries);
    expect(queryString).toEqual("invalid longitude");
});

// jest ./test/unit/UtilSchemaAddress.test.ts