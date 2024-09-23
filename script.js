const questions = [
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
let puntajes = JSON.parse(localStorage.getItem('highScores')) || [];

function displayHighScores() {
    const highScoresList = document.getElementById('high-scores-list');
    highScoresList.innerHTML = puntajes
        .map(puntaje => `<li>${puntaje.name}: ${puntaje.puntaje}</li>`)
        .join('');
}

document.getElementById('start-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    if (name) {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('quiz-container').style.display = 'block';
        loadQuestion();
    }
});

function loadQuestion() {
    const questionData = preguntas[preguntaActual];
    document.getElementById('question-text').textContent = questionData.pregunta;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    questionData.opciones.forEach((opcion, index) => {
        const button = document.createElement('button');
        button.textContent = opcion;
        button.classList.add('option-button');
        button.addEventListener('click', function() {
            checkAnswer(index);
        });
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const questionData = preguntas[preguntaActual];
    if (selectedIndex === questionData.answer) {
        puntaje++;
    }
    preguntaActual++;
    if (preguntaActual < preguntas.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('score-screen').style.display = 'block';
    document.getElementById('puntaje').textContent = `Puntuación: ${puntaje}/${preguntas.length}`;

    const name = document.getElementById('name').value;
    saveScore(name, puntaje);
    displayHighScores();
}

function saveScore(name, puntaje) {
    const newScore = { name: name, puntaje: puntaje };
    puntajes.push(newScore);
    puntajes.sort((a, b) => b.puntaje - a.puntaje);
    puntajes = puntajes.slice(0, 5); 
    localStorage.setItem('highScores', JSON.stringify(scores));
}

displayHighScores();