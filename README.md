# imagemapa.com.br

## Endpoint Map

|Query String|Name           |Type   |Default|Values        |Required|
|------------|---------------|-------|-------|--------------|--------|
|`lat`       |Latitude       |number |       |-90 to 90     |true    |
|`lng`       |Longitude      |number |       |-180 to 180   |true    |
|`z`         |Zoom           |number |16     |3 to 20       |false   |
|`f`         |Format         |string |jpg    |jpg, png, webp|false   |
|`q`         |Quality        |number |70     |0 to 100      |false   |
|`w`         |Width          |number |640    |100 to 1000   |false   |
|`h`         |Height         |number |480    |100 to 1000   |false   |

```
/api/map/?lat=-23.6153206&lng=-46.7669051&z=11

/api/map/?lat=-23.6153206&lng=-46.7669051&z=11&f=png

/api/map/?lat=-23.6153206&lng=-46.7669051&z=11&f=jpg&q=70

/api/map/?lat=-23.6153206&lng=-46.7669051&z=11&f=jpg&q=0.5&w=500&h=500
```

## Endpoint Route

|Query String|Name           |Type   |Default|Values           |Required|
|------------|---------------|-------|-------|-----------------|--------|
|`pos`       |Positions      |string |       |                 |true    |
|`a`         |Point A        |string |A      |A to Z or 0 to 1 |false   |
|`b`         |Point B        |string |B      |A to Z or 0 to 1 |false   |
|`c`         |Color          |string |#000   |color hex        |false   |
|`f`         |Format         |string |jpg    |jpg, png, webp   |false   |
|`q`         |Quality        |number |70     |0 to 100         |false   |
|`w`         |Width          |number |640    |100 to 1000      |false   |
|`h`         |Height         |number |480    |100 to 1000      |false   |

```
/api/route/?pos=-23.558609,-46.659551;-23.567210,-46.649518;

/api/route/?pos=-23.558609,-46.659551;-23.567210,-46.649518;&a=1&b=2

/api/route/?pos=-23.558609,-46.659551;-23.567210,-46.649518;&a=1&b=2&c=%23ff0

/api/route/?pos=-23.558609,-46.659551;-23.567210,-46.649518;&a=1&b=2&c=%23ff0&f=png

/api/route/?pos=-23.558609,-46.659551;-23.567210,-46.649518;&a=1&b=2&c=%23ff0&f=png&q=100

/api/route/?pos=-23.558609,-46.659551;-23.567210,-46.649518;&a=1&b=2&c=%23ff0&f=png&q=100&w=1000&h=100
```