import UtilFunctionQuery from "../../src/utils/functions/UtilFunctionQuery";

test("Should convert the url to query", function() {
    const url = "/query?test=hello";
    const route = "/query";
    const queryObject = {
        test: "hello",
    };
    const query = UtilFunctionQuery(url, route);
    expect(query).toEqual(queryObject);
});

test("Should convert the url in all types", function() {
    const url = "/test?number=123&float=1.23&text=hello&boolean=true";
    const route = "/test";
    const queryObject = {
        number: 123,
        float: 1.23,
        text: "hello",
        boolean: true,
    };
    const query = UtilFunctionQuery(url, route);
    expect(query).toEqual(queryObject);
});

test("Should not convert because url is invalid", function() {
    const url = "";
    const route = "/test";
    const result = UtilFunctionQuery(url, route);
    expect(result).toEqual("invalid url");
});

test("Should not convert because route is invalid", function() {
    const url = "/test";
    const route = "";
    const result = UtilFunctionQuery(url, route);
    expect(result).toEqual("invalid route");
});

test("Should not convert because dont has query", function() {
    const url = "/test";
    const route = "/test";
    const result = UtilFunctionQuery(url, route);
    expect(result).toEqual("does not has queries");
});

// jest ./test/unit/UtilFunctionQuery.test.ts