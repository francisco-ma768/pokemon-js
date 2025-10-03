
let seguir_cargando = false;
const pokemones = [];
const pokemon = {
  nombre: "",
  nivel: 0,
  tipo: [],
  foto: "",
  hp: 0,
  hp_total: 0,
  evolución: false,
};

do {

  pokemon.nombre = prompt("Ingrese el nombre del Pokémon:");
  pokemon.nivel = Number(prompt("Ingrese el nivel del Pokémon:"));

 
  pokemones.push(pokemon);
  let terminar = prompt("¿Desea cargar otro Pokémon? (si/no)");

  seguir_cargando = false;
  if (terminar === "si") {
    seguir_cargando = true;
  }
} while (seguir_cargando === true);
console.log(pokemones);
for (let i = 0; i < pokemones.length; i++) {
  console.log(
    "Nombre: " + pokemones[i].nombre + ", Nivel: " + pokemones[i].nivel
  );
}

