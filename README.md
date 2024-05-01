# imagemapa.com.br

## Endpoint Embed Map

|Query String|Name           |Type   |Default|Values        |Required|
|------------|---------------|-------|-------|--------------|--------|
|`lat`       |Latitude       |number |0      |-90 to 90     |false   |
|`lng`       |Longitude      |number |0      |-180 to 180   |false   |
|`z`         |Zoom           |number |5      |3 to 20       |false   |

```
/embed/map?lat=-23.6153206&lng=-46.7669051&z=11
```

## Endpoint API Map

O endpoint `map` retorna a imagem renderizada de um mapa da coordenada inserida via parâmetros no endereço de consulta. É possível, através dos parâmetros ajustar o zoom, formato de extensão da imagem, qualidade do mapa e dimensões de altura e comprimento.

A tabela com todos os parâmetros do endpoint `map`:

|Query String|Name           |Type   |Default|Values        |Required|
|------------|---------------|-------|-------|--------------|--------|
|`lat`       |Latitude       |number |       |-90 to 90     |true    |
|`lng`       |Longitude      |number |       |-180 to 180   |true    |
|`z`         |Zoom           |number |16     |3 to 20       |false   |
|`f`         |Format         |string |jpg    |jpg, png, webp|false   |
|`q`         |Quality        |number |70     |0 to 100      |false   |
|`w`         |Width          |number |640    |100 to 1000   |false   |
|`h`         |Height         |number |480    |100 to 1000   |false   |

Um exemplo em comando cURL de como deve ser feito a consulta do endpoint `map`:

```bash
curl \ 
    -x GET \
    -d "lat=48.8583287" \
    -d "lng=2.2944781" \
    -d "z=16" \
    -d "f=jpg" \
    -d "q=70" \
    -d "w=640" \
    -d "h=480" \
    https://imagemapa.com.br/api/map
```

## Endpoint API Route

O endpoint `route` retorna a rota em mapa em uma imagem renderizada contendo todo o trajeto traçado e marcado com circulos o ponto de origem e o ponto de finalização. Através dos parâmetros, é possível incluir em uma lista todas as posições da rota para formar o trajeto e o texto do ponto de origem e ponto de finalização.

A tabela com todos os parâmetros do endpoint `route`:

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

Um exemplo em comando cURL de como deve ser feito a consulta do endpoint `map`:

```bash
curl \ 
    -x GET \
    -d "pos=40.748885,-73.987644;40.747808,-73.985039;40.748468,-73.984588;40.748817, -73.985516" \
    -d "a=1" \
    -d "b=2" \
    -d "c=%23f54242"
    -d "f=jpg" \
    -d "q=70" \
    -d "w=640" \
    -d "h=480" \
    https://imagemapa.com.br/api/route
```

# Endpoint API Icon

O endpoint `icon` retorna uma imagem contendo um ícone personalizado como marcação em mapa. Através dos parâmetros, é possível passar o endereço do recurso de imagem do ícone e um valor como sua dimensão para ser renderizada.

A tabela com todos os parâmetros do endpoint `icon`:

|Query String|Name           |Type   |Default|Values           |Required|
|------------|---------------|-------|-------|-----------------|--------|
|`lat`       |Latitude       |number |       |-90 to 90        |true    |
|`lng`       |Longitude      |number |       |-180 to 180      |true    |
|`icon`      |Icon URL       |string |       |start https      |true    |
|`s`         |Icon Size      |number |64     |8 to 256         |false   |
|`z`         |Zoom           |number |16     |3 to 20          |false   |
|`f`         |Format         |string |jpg    |jpg, png, webp   |false   |
|`q`         |Quality        |number |70     |0 to 100         |false   |
|`w`         |Width          |number |640    |100 to 1000      |false   |
|`h`         |Height         |number |480    |100 to 1000      |false   |

Um exemplo em comando cURL de como deve ser feito a consulta do endpoint `icon`:

```bash
curl \ 
    -x GET \
    -d "lat=41.8896913" \
    -d "lng=12.4917166" \
    -d "z=18" \
    -d "icon=https%3A%2F%2Fi.postimg.cc%2FnzNJmhdh%2Ficon.png" \
    -d "s=96"
    -d "f=jpg" \
    -d "q=70" \
    -d "w=640" \
    -d "h=480" \
    https://imagemapa.com.br/api/icon
```
