const preguntas = [
    {
        pregunta: "¿Qué significa HTML?",
        opciones: ["HyperText Markup Language", "HyperText Machine Language", "Hyper Tool Multi Language"],
        respuesta: 0
    },
    {
        pregunta: "¿Qué propiedad en CSS se usa para cambiar el color del texto?",
        opciones: ["background-color", "color", "font-color"],
        respuesta: 1
    },
    {
        pregunta: "¿Cuál es el tag correcto para un enlace en HTML?",
        opciones: ["<link>", "<a>", "<href>"],
        respuesta: 1
    },
    {
        pregunta: "¿Cómo puedes crear una función en JavaScript?",
        opciones: ["function = myFunction()", "function myFunction()", "let myFunction = function()"],
        respuesta: 1
    },
    {
        pregunta: "¿Qué método se utiliza para convertir una cadena en un número entero en JavaScript?",
        opciones: ["parseInt()", "Number()", "parseFloat()"],
        respuesta: 0
    },
    {
        pregunta: "¿Cómo se puede comprobar si una variable `x` no está definida en JavaScript?",
        opciones: ["if (x != null)", "if (typeof x === 'undefined')", "if (x != undefined)"],
        respuesta: 1
    },
    {
        pregunta: "¿Cuál es el resultado de console.log(2 + '2'); en JavaScript?",
        opciones: ["4", "\"22\"", "NaN"],
        respuesta: 1
    },
    {
        pregunta: "¿Cómo puedes agregar un elemento al final de un array en JavaScript?",
        opciones: ["array.push()", "array.append()", "array.add()"],
        respuesta: 0
    },
    {
        pregunta: "¿Cómo se puede definir una variable en PHP?",
        opciones: ["$variable = 'valor';", "var variable = 'valor';", "let $variable = 'valor';"],
        respuesta: 0
    },
    {
        pregunta: "¿Cuál es el operador de concatenación en PHP?",
        opciones: ["+", "&", "."],
        respuesta: 2
    },
    {
        pregunta: "¿Cuál es la forma correcta de incluir otro archivo PHP dentro de otro?",
        opciones: ["include 'archivo.php';", "require 'archivo.php';", "import 'archivo.php';"],
        respuesta: 0
    },
    {
        pregunta: "¿Qué función se usa para obtener el número de elementos en un array en PHP?",
        opciones: ["length()", "sizeOf()", "count()"],
        respuesta: 2
    },
    {
        pregunta: "¿Qué superglobal en PHP se usa para acceder a los datos enviados por un formulario usando el método POST?",
        opciones: ["$_GET", "$_POST", "$_REQUEST"],
        respuesta: 1
    },
    {
        pregunta: "¿Cuál es el atributo correcto para hacer que un enlace se abra en una nueva pestaña en HTML?",
        opciones: ["target=\"_self\"", "target=\"_blank\"", "target=\"_top\""],
        respuesta: 1
    },
    {
        pregunta: "¿Qué significa CSS?",
        opciones: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
        respuesta: 1
    },
    {
        pregunta: "¿Cómo se puede crear un comentario en CSS?",
        opciones: ["// Esto es un comentario", "/* Esto es un comentario */", "<!-- Esto es un comentario -->"],
        respuesta: 1
    },
    {
        pregunta: "¿Qué propiedad en CSS controla el tamaño del texto?",
        opciones: ["font-style", "font-size", "text-size"],
        respuesta: 1
    },
    {
        pregunta: "¿Cuál es el tag correcto para una tabla en HTML?",
        opciones: ["<table>", "<tbl>", "<tab>"],
        respuesta: 0
    }
    
];

// variables para el seguimiento de la pregunta actual y el puntaje del usuario.
let preguntaActual = 0; // Indica cuál es la pregunta actual en el quiz.
let puntaje = 0; // Guarda el puntaje del usuario.

// Obtiene los puntajes altos del localStorage, o inicializa como un array vacío si no hay datos.
let puntajes = JSON.parse(localStorage.getItem('puntajesAltos')) || [];

// Función para mostrar los puntajes altos en la interfaz.
function mostrarPuntajesAltos() {
    const listaPuntajes = document.getElementById('listaPuntajes'); 
    listaPuntajes.innerHTML = puntajes
        .filter(p => p.nombre && p.puntaje !== undefined) // Filtra solo los puntajes válidos.
        .map(p => `<li>${p.nombre}: ${p.puntaje}</li>`) // Crea un elemento de lista para cada puntaje.
        .join(''); // Une todos los elementos en una sola cadena.
}

// Se agrega un evento al formulario para iniciar el quiz.
document.getElementById('iniciar').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se recargue la página
    const nombre = document.getElementById('nombre').value; // Obtiene el nombre ingresado por el usuario.
    if (nombre) { // Verifica que se haya ingresado un nombre.
        document.getElementById('pantallaInicio').style.display = 'none'; // Oculta la pantalla de inicio.
        document.getElementById('quiz').style.display = 'block'; // Muestra la sección del quiz.
        cargarPregunta(); // Llama a la función para cargar la primera pregunta.
    }
});

// Función para cargar la pregunta actual en la interfaz.
function cargarPregunta() {
    const datosPregunta = preguntas[preguntaActual]; // Obtiene los datos de la pregunta actual.
    document.getElementById('textoPregunta').textContent = datosPregunta.pregunta; // Muestra la pregunta en el HTML.
    const contenedorOpciones = document.getElementById('contenedorOpciones'); // Contenedor para las opciones de respuesta.
    contenedorOpciones.innerHTML = ''; // Limpia opciones anteriores.

    // Se itera sobre las opciones de respuesta para crear botones.
    datosPregunta.opciones.forEach((opcion, index) => {
        const button = document.createElement('button'); // Crea un nuevo botón.
        button.textContent = opcion; // Establece el texto del botón.
        button.classList.add('btnOpcion'); // Agrega una clase para estilos.
        button.addEventListener('click', function() { // Agrega un evento click al botón.
            checkRespuesta(index); // Llama a la función para verificar la respuesta.
        });
        contenedorOpciones.appendChild(button); // Agrega el botón al contenedor de opciones.
    });
}

// Función que verifica si la respuesta seleccionada es correcta.
function checkRespuesta(selectedIndex) {
    const preguntaDatos = preguntas[preguntaActual]; // Obtiene los datos de la pregunta actual.
    if (selectedIndex === preguntaDatos.respuesta) { // Compara el índice seleccionado con la respuesta correcta.
        puntaje++; // Incrementa el puntaje si la respuesta es correcta.
    }
    preguntaActual++; // Avanza a la siguiente pregunta.
    if (preguntaActual < preguntas.length) { // Verifica si hay más preguntas.
        cargarPregunta(); // Carga la siguiente pregunta.
    } else {
        terminarQuiz(); // Si no hay más preguntas, termina el quiz.
    }
}

// Función para manejar el final del quiz.
function terminarQuiz() {
    document.getElementById('quiz').style.display = 'none'; // Oculta la sección del quiz.
    document.getElementById('pantallaPuntaje').style.display = 'block'; // Muestra la pantalla de puntaje.
    document.getElementById('puntaje').textContent = `Puntuación: ${puntaje}/${preguntas.length}`; // Muestra el puntaje final.

    const nombre = document.getElementById('nombre').value; // Obtiene el nombre ingresado.
    guardarPuntaje(nombre, puntaje); // Guarda el puntaje del usuario.
    mostrarPuntajesAltos(); // Muestra los puntajes altos actualizados.
}

// Función para guardar el puntaje en localStorage.
function guardarPuntaje(nombre, puntaje) {
    const nuevoPuntaje = { nombre, puntaje }; // Crea un objeto con el nombre y puntaje.

    if (nombre && puntaje !== undefined) { // Verifica que el nombre y puntaje sean válidos.
        puntajes.push(nuevoPuntaje); // Agrega el nuevo puntaje al array de puntajes.
        puntajes.sort((a, b) => b.puntaje - a.puntaje); // Ordena los puntajes de mayor a menor.
        puntajes = puntajes.slice(0, 5);  // Limita el array a los 5 mejores puntajes.
        localStorage.setItem('puntajesAltos', JSON.stringify(puntajes)); // Guarda el array en localStorage.
    }
}

// Llama a la función para mostrar los puntajes altos al cargar la página.
mostrarPuntajesAltos();