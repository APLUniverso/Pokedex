const serchInput = document.getElementById("input");

async function buscarPokemon(pokeName) {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    const data = await respuesta.json();
    console.log(data);
}
serchInput.addEventListener("input",()=>{
    console.log(serchInput.value)

})