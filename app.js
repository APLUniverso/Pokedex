const serchInput = document.getElementById("input");
const nN = document.getElementById("nN")
const imagen = document.getElementById("imagen")

const next = document.getElementById("next")
const prev = document.getElementById("prev")

let pokeDataList = [];

async function iniciar() {
    const data = await pedirInformcion("https://pokeapi.co/api/v2/pokemon?limit=2000");
    pokeDataList = data.results;
}

async function pedirInformcion(url) {
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    return data;
}

async function getPokemonById(id) {
    try{
        const pokeAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (!pokeAPI.ok){
            throw new Error("POKEMON NO ENCONTRADO")
        }

        const pokedata = await pokeAPI.json();
        return pokedata

    }catch (error){
        console.log("no puede ser huvo un error");
    }
}

function filtrarPokemones(data,input){
    return data.filter(pokemon => pokemon.name.includes(input))
}

function ordendorPrioridad(dataFiltrada,input){
    const ordenFinal = dataFiltrada.map(
        pokemon => {
            let puntaje = 0
            let pokeName = pokemon.name

            if (pokeName.startsWith(input)){
                puntaje += 3
            }else if(pokeName.includes(input)){
                puntaje += 2
            }

            return {...pokemon,puntaje}
        }
    ).filter(p => p.puntaje > 0).sort((a,b) => b.puntaje - a.puntaje)

    return ordenFinal[0]
}

function mostrarEnPantalla(pokeData){
    nN.innerHTML = ""
    nN.innerHTML = `
    <div class="pokeInfo">
        <h1 class="grey">${pokeData.id} - </h1>
        <h1>${pokeData.species.name}</p>
    </div>
    `;
    imagen.innerHTML = ""
    const pokeimagen = document.createElement("img")
    const sprite =
    pokeData.sprites.versions?.["generation-v"]?.["black-white"]?.animated?.front_default
    ||pokeData.sprites.front_default
    ||pokeData.sprites.front_shiny
    ||"";
    if (sprite) {
        pokeimagen.src = sprite;
        imagen.append(pokeimagen);
    } else {
        imagen.innerHTML = "<p>Sin imagen disponible</p>";
    }
}

iniciar();
let pokeData = "";
serchInput.addEventListener("input",async ()=>{
    const pokeNameInput = serchInput.value.trim().toLowerCase()

    if (/^\d+$/.test(pokeNameInput)) {
        pokeData = await getPokemonById(pokeNameInput)
    } else {
        const pokemon = ordendorPrioridad(filtrarPokemones(pokeDataList,pokeNameInput),pokeNameInput)
        pokeData = await pedirInformcion(pokemon.url)
    }

    mostrarEnPantalla(pokeData)
})
 
prev.addEventListener("click",async () => {
    if(pokeData != ""){
        pokeData = await getPokemonById(pokeData.id - 1)
        mostrarEnPantalla(pokeData)
    }
});

next.addEventListener("click",async () => {
    if(pokeData != ""){
        pokeData = await getPokemonById(pokeData.id + 1)
        mostrarEnPantalla(pokeData)
    }
});