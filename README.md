# Pokedex

Aplicación web que consume la [PokéAPI](https://pokeapi.co/) para mostrar información de Pokémon de forma interactiva.

## Qué hace

- Consulta Pokémon por nombre o número
- Muestra estadísticas, tipo, sprite y descripción
- Interfaz responsive con HTML, CSS y JavaScript vanilla

## Stack

- HTML5 · CSS3 · JavaScript (vanilla)
- [PokéAPI](https://pokeapi.co/) — REST API

## Estructura

```
├── index.html      # Vista principal
├── style.css       # Estilos
├── app.js          # Lógica + fetch a la API
└── media/          # Recursos
```

## Uso local

```bash
git clone https://github.com/felixBD04/Pokedex.git
cd Pokedex
# Abre index.html en tu navegador
```

> Para evitar problemas de CORS al hacer fetch, sirve los archivos con un servidor local:
> ```bash
> python -m http.server 8000
> # o
> npx live-server
> ```

## Aprendizajes

Proyecto enfocado en practicar:
- Consumo de APIs REST con `fetch`
- Manipulación del DOM
- Manejo de estados de carga y errores
- Renderizado dinámico de tarjetas
