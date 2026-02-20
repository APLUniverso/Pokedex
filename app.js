const serchInput = document.getElementById("input");// el input de donde se saca la informacion

const nN = document.getElementById("nN") // el espacio donde va a estar contenido el nombre
const imagen = document.getElementById("imagen")// el espeacio donde va a estar contenida la imagen

const next = document.getElementById("next") //boton next
const prev = document.getElementById("prev") //boton anterior

let pokeDataList = []; //variable donde va a estar contenida toda la pokeapi

//INICIAMOS EL CODIGO LLAMANDO LA UNDORMAICON DE LA API
async function iniciar() {
    const data = await pedirInformcion("https://pokeapi.co/api/v2/pokemon?limit=2000");
    pokeDataList = data.results;
}

//FUNCION QUE PIDE INFOMACION DE LA API
async function pedirInformcion(url) {
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    return data;
}

//FUNCION QUE BUSCA POKEMONES POR SU ID Y RETORNA LA INFROMACION DEL MISMO
async function getPokemonById(id) {
    try{
        //hacemos el requerimiento a la api
        const pokeAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (!pokeAPI.ok){ //si no encontro pokemon con ese id manda error
            throw new Error("POKEMON NO ENCONTRADO")
        }

        const pokedata = await pokeAPI.json();
        return pokedata //devolvemos la informacion

    }catch (error){
        console.log("no puede ser huvo un error");
    }
}

//FILTRAMOS LOS POQUEMONES QUE CONTENGAN ESAS LETRAS
function filtrarPokemones(data,input){
    return data.filter(pokemon => pokemon.name.includes(input))
}

//ORDENAMOS LOS POQUEMONES PREVIAMENTE FILTRADOS
function ordendorPrioridad(dataFiltrada,input){
    const ordenFinal = dataFiltrada.map(
        pokemon => {
            let puntaje = 0 //sistema de puntajes
            let pokeName = pokemon.name

            if (pokeName.startsWith(input)){ //si empieza por esas letras tiene 3 puntos
                puntaje += 3
            }else if(pokeName.includes(input)){ //si solo tiene las letras en su interior 2 puntos
                puntaje += 2
            }

            return {...pokemon,puntaje} //devolvemos la informacion del poquemon mas su puntaje
        }
    ).filter(p => p.puntaje > 0).sort((a,b) => b.puntaje - a.puntaje)
    //       si puntaje 0 FUERA       sort ordena los puntajes del mayor al menos 

    return ordenFinal[0].url //devolvemos el mayor puntaje
}

//COLOCA EN PANTALLA LA INFORMACION DEL POKEMON
function mostrarEnPantalla(pokeData){
    nN.innerHTML = ""
    nN.innerHTML = `
    <div class="pokeInfo">
        <h1 class="grey">${pokeData.id} -</h1>
        <h1>    ${pokeData.species.name}</p>
    </div>
    `;
    imagen.innerHTML = ""
    const pokeimagen = document.createElement("img")
    //crea una condicion en la que si no posee la imagen que le solicito use otra de la api
    const sprite =
    pokeData.sprites.versions?.["generation-v"]?.["black-white"]?.animated?.front_default
    ||pokeData.sprites.front_default
    ||pokeData.sprites.front_shiny
    ||"";

    if (sprite) {
        imagen.classList.remove("agrandar")
        if (sprite === pokeData.sprites.front_default){
            imagen.classList.add("agrandar")
        }
        pokeimagen.src = sprite;
        imagen.append(pokeimagen);
    } else {//por si no encuentra imagen
        imagen.innerHTML = "<p>Sin imagen disponible</p>";
    }
}

//inicio del programa
iniciar();
let pokeData = ""; //variable que contendra la informacion del poekmon

//al cambiar el contenido dentro del input
serchInput.addEventListener("input",async ()=>{
    const pokeNameInput = serchInput.value.trim().toLowerCase()

    if (/^\d+$/.test(pokeNameInput)) { //validamos que sea un numero
        pokeData = await getPokemonById(pokeNameInput)
    } else {
        pokeData = await pedirInformcion(ordendorPrioridad(filtrarPokemones(pokeDataList,pokeNameInput),pokeNameInput))
    }

    mostrarEnPantalla(pokeData)
})

//al dar click se realiza la accion
prev.addEventListener("click",async () => {
    if(pokeData != ""){
        pokeData = await getPokemonById(pokeData.id - 1)
        mostrarEnPantalla(pokeData)
    }
});

//al dar click se realiza la accion
next.addEventListener("click",async () => {
    if(pokeData != ""){
        pokeData = await getPokemonById(pokeData.id + 1)
        mostrarEnPantalla(pokeData)
    }
});