import UtilSchemaIcon from "../../src/utils/schemas/UtilSchemaIcon";

test("Should convert the string url in object", function() {
    const url = "/img/icon?lat=12&lng=34&icon=https%3A%2F%2Fraw.githubusercontent.com%2Fpdaug%2Fimagemapa%2Fmain%2Fpublic%2Ficon.png";
    const route = "/img/icon";
    const urlObject = {
        format: "jpg",
        height: 480,
        icon: "https://raw.githubusercontent.com/pdaug/imagemapa/main/public/icon.png",
        latitude: 12,
        longitude: 34,
        quality: 70,
        size: 64,
        width: 640,
        zoom: 16,
    };
    const queryString = UtilSchemaIcon(url, route);
    expect(queryString).toEqual(urlObject);
});

// jest ./test/unit/UtilSchemaIcon.test.ts