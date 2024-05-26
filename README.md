# imagemapa.com.br

![image info](https://raw.githubusercontent.com/pdaug/imagemapa/main/public/screenshot.png)

## Endpoint Embed Map

O endpoint `/embed/map` retorna uma página dinâmica contendo um mapa localizado na coordenada inserida via parâmetros no endereço de consulta. Com o mapa é possível navegar arrastando o mouse/toque e ampliar com o scroll/pinça.

A tabela com todos os parâmetros do endpoint `/embed/map`:

|Query String|Name           |Type   |Default|Values        |Required|
|------------|---------------|-------|-------|--------------|--------|
|`lat`       |Latitude       |number |0      |-90 to 90     |true    |
|`lng`       |Longitude      |number |0      |-180 to 180   |true    |
|`z`         |Zoom           |number |5      |3 to 20       |false   |

Um exemplo feito com HTML de como deve ser consumido o endpoint `/api/map`:

```html
<!-- 
    if you running in your machine, open it:
    http://localhost:8080/embed/map?lat=-23.6153206&lng=-46.7669051&z=11 
-->
<iframe 
    width="640" 
    height="480"
    frameborder="0" 
    src="https://imagemapa.com.br/embed/map?lat=-23.6153206&lng=-46.7669051&z=11">
</iframe>
```

## Endpoint API Map

O endpoint `/api/map` retorna a imagem renderizada de um mapa da coordenada inserida via parâmetros no endereço de consulta. É possível, através dos parâmetros ajustar o zoom, formato de extensão da imagem, qualidade do mapa e dimensões de altura e comprimento.

A tabela com todos os parâmetros do endpoint `/api/map`:

|Query String|Name           |Type   |Default|Values        |Required|
|------------|---------------|-------|-------|--------------|--------|
|`lat`       |Latitude       |number |       |-90 to 90     |true    |
|`lng`       |Longitude      |number |       |-180 to 180   |true    |
|`z`         |Zoom           |number |16     |3 to 20       |false   |
|`f`         |Format         |string |jpg    |jpg, png, webp|false   |
|`q`         |Quality        |number |70     |0 to 100      |false   |
|`w`         |Width          |number |640    |100 to 1000   |false   |
|`h`         |Height         |number |480    |100 to 1000   |false   |

Um exemplo em comando cURL de como deve ser feito a consulta do endpoint `/api/map`:

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

`http://localhost:8080/api/map?lat=48.8583287&lng=2.2944781&z=16&f=jpg&q=70&w=640&h=480`

`https://imagemapa.com.br/api/map?lat=48.8583287&lng=2.2944781&z=16&f=jpg&q=70&w=640&h=480`

## Endpoint API Route

O endpoint `/api/route` retorna a rota em mapa em uma imagem renderizada contendo todo o trajeto traçado e marcado com circulos o ponto de origem e o ponto de finalização. Através dos parâmetros, é possível incluir em uma lista todas as posições da rota para formar o trajeto e o texto do ponto de origem e ponto de finalização.

A tabela com todos os parâmetros do endpoint `/api/route`:

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

Um exemplo em comando cURL de como deve ser feito a consulta do endpoint `/api/map`:

```bash
curl \ 
    -x GET \
    -d "pos=40.748885,-73.987644;40.747808,-73.985039;40.748468,-73.984588;40.748817,-73.985516" \
    -d "a=1" \
    -d "b=2" \
    -d "c=#f54242"
    -d "f=jpg" \
    -d "q=70" \
    -d "w=640" \
    -d "h=480" \
    https://imagemapa.com.br/api/route
```

`http://localhost:8080/api/route?pos=40.748885,-73.987644;40.747808,-73.985039;40.748468,-73.984588;40.748817,-73.985516&a=1&b=2&c=f54242&f=jpg&q=70&w=640&h=480`

`https://imagemapa.com.br/api/route?pos=40.748885,-73.987644;40.747808,-73.985039;40.748468,-73.984588;40.748817,-73.985516&a=1&b=2&c=f54242&f=jpg&q=70&w=640&h=480`

# Endpoint API Icon

O endpoint `/api/icon` retorna uma imagem contendo um ícone personalizado como marcação em mapa. Através dos parâmetros, é possível passar o endereço do recurso de imagem do ícone e um valor como sua dimensão para ser renderizada.

A tabela com todos os parâmetros do endpoint `/api/icon`:

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

Um exemplo em comando cURL de como deve ser feito a consulta do endpoint `/api/icon`:

```bash
curl \ 
    -x GET \
    -d "lat=41.8896913" \
    -d "lng=12.4917166" \
    -d "z=18" \
    -d "icon=https://raw.githubusercontent.com/pdaug/imagemapa/main/public/icon.png" \
    -d "s=96"
    -d "f=jpg" \
    -d "q=70" \
    -d "w=640" \
    -d "h=480" \
    https://imagemapa.com.br/api/icon
```

``