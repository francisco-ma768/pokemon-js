/**
 * Commit 3: Implementación del array de objetos Pokémon y lógica del menú.
 * Completa los Puntos 3.b y 4 de la consigna.
 */

// ----------------------------------------------------------------------
// 1. ARRAY INICIAL DE OBJETOS POKÉMON (Punto 3.b)
// La estructura es obligatoria: nombre, nivel, tipo[], foto, hp, hp_total, evolucion
// ----------------------------------------------------------------------

let pokemones = [
    // Pokémon 1: Ejemplo Eléctrico
    {
        nombre: "Pikachu",
        nivel: 25,
        tipo: ["Eléctrico"],
        foto: "pikachu.jpg",
        hp: 60,
        hp_total: 60,
        evolucion: true
    },
    // Pokémon 2: Ejemplo Fuego/Volador
    {
        nombre: "Charizard",
        nivel: 36,
        tipo: ["Fuego", "Volador"],
        foto: "charizard.jpg",
        hp: 90,
        hp_total: 90,
        evolucion: false // Ya evolucionó al máximo
    },
    // Pokémon 3: Ejemplo Agua
    {
        nombre: "Squirtle",
        nivel: 15,
        tipo: ["Agua"],
        foto: "squirtle.jpg",
        hp: 50,
        hp_total: 50,
        evolucion: true
    }
];


// ----------------------------------------------------------------------
// 2. FUNCIONES AUXILIARES (Punto 4.d)
// Muestra el array completo y la lista de nombres en la consola.
// ----------------------------------------------------------------------

function mostrarLista(arr) {
    console.log("========================================");
    console.log("--- ARRAY COMPLETO DE OBJETOS POKÉMON ---");
    console.log(arr); // Muestra el array completo (Punto 4.d.i)

    console.log("--- NOMBRES DE POKÉMON CARGADOS ---");
    // Extrae solo los nombres en un nuevo array
    let nombres = arr.map(p => p.nombre);
    console.log(nombres.join(", ")); // Muestra la lista de nombres (Punto 4.d.ii)
    console.log("========================================");
}

// ----------------------------------------------------------------------
// 3. LÓGICA DEL MENÚ PRINCIPAL (Punto 4.a, b, c)
// ----------------------------------------------------------------------

function cargarPokemon(arr) {
    let seguir = 'si';
    // Bucle para agregar múltiples Pokémon (Punto 4.b.ii)
    while (seguir.toLowerCase() === 'si') {
        alert("A continuación, ingrese los datos para un nuevo Pokémon:");
        
        // Pide los valores para cada propiedad (Punto 4.b.i)
        const nombre = prompt("Ingrese el nombre:");
        if (!nombre) { alert("Carga cancelada."); return; }
        
        const nivel = parseInt(prompt("Ingrese el nivel (número):"));
        if (isNaN(nivel)) { alert("Nivel inválido."); return; }

        const tipoInput = prompt("Ingrese los tipos (separados por coma, ej: Fuego,Volador):");
        const tipo = tipoInput ? tipoInput.split(',').map(t => t.trim()) : [];
        
        const foto = prompt("Ingrese la foto (ej: pidgey.jpg):");
        const hp = parseInt(prompt("Ingrese la HP (Salud) inicial (número):"));
        if (isNaN(hp)) { alert("HP inválida."); return; }

        const evolucionStr = prompt("¿Tiene evolución? (si/no):").toLowerCase();
        const evolucion = evolucionStr === 'si';

        // Crea el nuevo objeto y lo añade al array (Punto 4.b.i)
        const nuevoPokemon = { 
            nombre, 
            nivel, 
            tipo, 
            foto, 
            hp, 
            hp_total: hp, // hp_total es igual a la hp inicial
            evolucion 
        };
        arr.push(nuevoPokemon);
        alert(`${nombre} ha sido agregado al equipo. ¡Felicidades!`);

        seguir = prompt("¿Desea agregar otro Pokémon? (si/no)").toLowerCase();
    }
}

function restarHP(arr) {
    // 1. Mostrar los Pokémon disponibles para elegir
    const nombresDisponibles = arr.map((p, index) => 
        `${index + 1}. ${p.nombre} (HP actual: ${p.hp}/${p.hp_total})`
    ).join('\n');
    
    // El usuario selecciona por número
    const eleccion = parseInt(prompt(`Seleccione el NÚMERO del Pokémon para restarle HP:\n${nombresDisponibles}`)) - 1;

    // 2. Validar la elección
    if (eleccion >= 0 && eleccion < arr.length) {
        const nombrePokemon = arr[eleccion].nombre;
        const danio = parseInt(prompt(`Ingrese la cantidad de HP a restar de ${nombrePokemon}:`));
        
        // 3. Aplicar el daño (Punto 4.c.i)
        if (!isNaN(danio) && danio > 0) {
            arr[eleccion].hp = Math.max(0, arr[eleccion].hp - danio); // Asegura que HP no baje de 0
            
            alert(`${nombrePokemon} ha recibido ${danio} de daño.\nHP restante: ${arr[eleccion].hp}`);
        } else {
            alert("Valor de daño inválido. No se restó HP.");
        }
    } else {
        alert("Selección de Pokémon inválida.");
    }
}

// ----------------------------------------------------------------------
// 4. BUCLE PRINCIPAL QUE MUESTRA EL MENÚ (Punto 4.a)
// ----------------------------------------------------------------------

let opcion = '';
// El bucle se mantiene hasta que el usuario pulse Cancelar (opcion es null)
while (opcion !== null) { 
    opcion = prompt(
        "Menú Principal Pokémon\n" +
        "-----------------------------------\n" +
        "a. Mostrar Pokémon cargados\n" +
        "b. Cargar un nuevo Pokémon\n" +
        "c. Restar HP a un Pokémon existente\n" +
        "-----------------------------------\n" +
        "Presione Cancelar o ESC para salir."
    );

    if (opcion === null) {
        alert("Programa finalizado. ¡Hasta pronto!");
        break; // Sale del bucle
    }

    switch (opcion.toLowerCase().trim()) {
        case 'a':
            mostrarLista(pokemones);
            break;
        case 'b':
            cargarPokemon(pokemones);
            mostrarLista(pokemones); // Mostrar después de la acción (Punto 4.d)
            break;
        case 'c':
            restarHP(pokemones);
            mostrarLista(pokemones); // Mostrar después de la acción (Punto 4.d)
            break;
        default:
            alert("Opción inválida. Por favor, ingrese 'a', 'b' o 'c'.");
            break;
    }
}