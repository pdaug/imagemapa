# imagemapa.com.br

![image info](https://raw.githubusercontent.com/pdaug/imagemapa/main/public/screenshot.png)

## Rota API Address

A rota `/api/address` retorna estruturadamente os dados de endereço, coordenada e provedor utilizado através dos parâmetros passados.

A tabela com todos os parâmetros aceitos na rota:

|Query String|Name           |Type   |Default|Values        |Required|
|------------|---------------|-------|-------|--------------|--------|
|`lat`       |Latitude       |number |0      |-90 to 90     |true    |
|`lng`       |Longitude      |number |0      |-180 to 180   |true    |

Um exemplo de como deve ser feito o consumo da rota:

```js
fetch("https://imagemapa.com.br/api/address?lat=51.5320122&lng=-0.1773339")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
```

A tabela mostrando todos os campos retornado pela rota:

|Field       |Name                 |Type                 |
|------------|---------------------|---------------------|
|`version`   |Versão da rota       |number               |
|`server`    |Nome do servidor     |number               |
|`status`    |Estado da resposta   |"error" ou "success" |
|`code`      |Código da resposta   |http code            |
|`message`   |Mensagem da resposta |string               |
|`path`      |Caminho da rota      |string               |
|`result`    |Resultado da rota    |object ou string     |
|`timestamp` |Tempo de repsosta    |number               |

Outro exemplo contendo apenas o endereço da rota:

```
https://imagemapa.com.br/api/address?lat=51.5320122&lng=-0.1773339
```

## Rota API Street

A rota `/api/street` retorna estruturadamente os dados contendo como resultado o endereço da página dinâmica do Google Street View para usar em incorporação em websites e aplicações.

A tabela com todos os parâmetros aceitos na rota:

|Query String|Name           |Type   |Default|Values        |Required|
|------------|---------------|-------|-------|--------------|--------|
|`lat`       |Latitude       |number |0      |-90 to 90     |true    |
|`lng`       |Longitude      |number |0      |-180 to 180   |true    |
|`b`         |Bearing        |number |0      |0 to 360      |false   |
|`t`         |Tilt           |number |0      |-90 to 90     |false   |
|`p`         |Pitch          |number |0      |-90 to 90     |false   |
 
Um exemplo de como deve ser feito o consumo da rota:

```js
fetch("https://imagemapa.com.br/api/street?lat=51.5320122&lng=-0.1773339&b=90&t=45&p=45")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
```

A tabela mostrando todos os campos retornado pela rota:

|Field       |Name                 |Type                 |
|------------|---------------------|---------------------|
|`version`   |Versão da rota       |number               |
|`server`    |Nome do servidor     |number               |
|`status`    |Estado da resposta   |"error" ou "success" |
|`code`      |Código da resposta   |http code            |
|`message`   |Mensagem da resposta |string               |
|`path`      |Caminho da rota      |string               |
|`result`    |Resultado da rota    |string               |
|`timestamp` |Tempo de repsosta    |number               |

Outro exemplo contendo apenas o endereço da rota:

```
https://imagemapa.com.br/api/street?lat=51.5320122&lng=-0.1773339&b=90&t=45&p=45
```

## Rota Embed Map

A rota `/embed/map` retorna uma página dinâmica contendo um mapa localizado na coordenada inserida via parâmetros no endereço de consulta. Com o mapa é possível navegar arrastando o mouse/toque e ampliar com o scroll/pinça.

A tabela com todos os parâmetros da rota:

|Query String|Name           |Type   |Default|Values        |Required|
|------------|---------------|-------|-------|--------------|--------|
|`lat`       |Latitude       |number |0      |-90 to 90     |true    |
|`lng`       |Longitude      |number |0      |-180 to 180   |true    |
|`z`         |Zoom           |number |5      |3 to 20       |false   |

Um exemplo de como o consumo deve ser feito com HTML:

```html
<iframe 
    width="640" 
    height="480"
    frameborder="0" 
    src="https://imagemapa.com.br/embed/map?lat=-23.6153206&lng=-46.7669051&z=11">
</iframe>
```

## Rota IMG Map

A rota `/img/map` retorna a imagem renderizada de um mapa da coordenada inserida via parâmetros no endereço de consulta. É possível, através dos parâmetros ajustar o zoom, formato de extensão da imagem, qualidade do mapa e dimensões de altura e comprimento.

A tabela com todos os parâmetros da rota:

|Query String|Name           |Type   |Default|Values        |Required|
|------------|---------------|-------|-------|--------------|--------|
|`lat`       |Latitude       |number |       |-90 to 90     |true    |
|`lng`       |Longitude      |number |       |-180 to 180   |true    |
|`z`         |Zoom           |number |16     |3 to 20       |false   |
|`f`         |Format         |string |jpg    |jpg, png, webp|false   |
|`q`         |Quality        |number |70     |0 to 100      |false   |
|`w`         |Width          |number |640    |100 to 1000   |false   |
|`h`         |Height         |number |480    |100 to 1000   |false   |

Um exemplo em comando cURL de como deve ser feito a consulta da rota:

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
    https://imagemapa.com.br/img/map
```

Abaixo um outro exemplo de como o consumo deve ser feito com HTML:

```html
<img 
    width="640"
    height="480"
    alt="imagemapa img map"
    src="http://localhost:8080/img/map?lat=48.8583287&lng=2.2944781&z=16&f=jpg&q=70&w=640&h=480" 
/>
```

## Rota IMG Route

A rota `/img/route` retorna a rota em mapa em uma imagem renderizada contendo todo o trajeto traçado e marcado com circulos o ponto de origem e o ponto de finalização. Através dos parâmetros, é possível incluir em uma lista todas as posições da rota para formar o trajeto e o texto do ponto de origem e ponto de finalização.

A tabela com todos os parâmetros da rota:

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

Um exemplo em comando cURL de como deve ser feito a consulta da rota:

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
    https://imagemapa.com.br/img/route
```

Abaixo um outro exemplo de como o consumo deve ser feito com HTML:

```html
<img 
    width="640"
    height="480"
    alt="imagemapa img route"
    src="http://localhost:8080/img/route?pos=40.748885,-73.987644;40.747808,-73.985039;40.748468,-73.984588;40.748817,-73.985516&a=1&b=2&c=f54242&f=jpg&q=70&w=640&h=480" 
/>
```

## Rota IMG Icon

A rota `/img/icon` retorna uma imagem contendo um ícone personalizado como marcação em mapa. Através dos parâmetros, é possível passar o endereço do recurso de imagem do ícone e um valor como sua dimensão para ser renderizada.

A tabela com todos os parâmetros da rota:

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

Um exemplo em comando cURL de como deve ser feito a consulta da rota:

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
    https://imagemapa.com.br/img/icon
```

Abaixo um outro exemplo de como o consumo deve ser feito com HTML:

```html
<img 
    width="640"
    height="480"
    alt="imagemapa img icon"
    src="http://localhost:8080/img/icon?lat=41.8896913&lng=12.4917166&z=18&icon=https%3A%2F%2Fraw.githubusercontent.com%2Fpdaug%2Fimagemapa%2Fmain%2Fpublic%2Ficon.png&s=96&f=jpg&q=70&w=640&h=480" 
/>
```