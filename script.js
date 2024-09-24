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

let preguntaActual = 0;
let puntaje = 0;
let puntajes = JSON.parse(localStorage.getItem('puntajesAltos')) || [];

function mostrarPuntajesAltos() {
    const listaPuntajes = document.getElementById('listaPuntajes');
    listaPuntajes.innerHTML = puntajes
        .filter(p => p.nombre && p.puntaje !== undefined)
        .map(p => `<li>${p.nombre}: ${p.puntaje}</li>`)
        .join('');
}

document.getElementById('iniciar').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    if (nombre) {
        document.getElementById('pantallaInicio').style.display = 'none';
        document.getElementById('quiz').style.display = 'block';
        cargarPregunta();
    }
});

function cargarPregunta() {
    const datosPregunta = preguntas[preguntaActual];
    document.getElementById('textoPregunta').textContent = datosPregunta.pregunta;
    const contenedorOpciones = document.getElementById('contenedorOpciones');
    contenedorOpciones.innerHTML = '';

    datosPregunta.opciones.forEach((opcion, index) => {
        const button = document.createElement('button');
        button.textContent = opcion;
        button.classList.add('btnOpcion');
        button.addEventListener('click', function() {
            checkRespuesta(index);
        });
        contenedorOpciones.appendChild(button);
    });
}

function checkRespuesta(selectedIndex) {
    const preguntaDatos = preguntas[preguntaActual];
    if (selectedIndex === preguntaDatos.respuesta) {
        puntaje++;
    }
    preguntaActual++;
    if (preguntaActual < preguntas.length) {
        cargarPregunta();
    } else {
        terminarQuiz();
    }
}

function terminarQuiz() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('pantallaPuntaje').style.display = 'block';
    document.getElementById('puntaje').textContent = `Puntuación: ${puntaje}/${preguntas.length}`;

    const nombre = document.getElementById('nombre').value;
    guardarPuntaje(nombre, puntaje);
    mostrarPuntajesAltos();
}

function guardarPuntaje(nombre, puntaje) {
    const nuevoPuntaje = { nombre, puntaje };

    if (nombre && puntaje !== undefined) {
        puntajes.push(nuevoPuntaje);
        puntajes.sort((a, b) => b.puntaje - a.puntaje);
        puntajes = puntajes.slice(0, 5);  
        localStorage.setItem('puntajesAltos', JSON.stringify(puntajes));
    }
}

mostrarPuntajesAltos();