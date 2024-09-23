const questions = [
    {
        question: "¿Qué significa HTML?",
        options: ["HyperText Markup Language", "HyperText Machine Language", "Hyper Tool Multi Language"],
        answer: 0
    },
    {
        question: "¿Qué propiedad en CSS se usa para cambiar el color del texto?",
        options: ["background-color", "color", "font-color"],
        answer: 1
    },
    {
        question: "¿Cuál es el tag correcto para un enlace en HTML?",
        options: ["<link>", "<a>", "<href>"],
        answer: 1
    },
    {
        question: "¿Cómo puedes crear una función en JavaScript?",
        options: ["function = myFunction()", "function myFunction()", "let myFunction = function()"],
        answer: 1
    },
    {
        question: "¿Qué método se utiliza para convertir una cadena en un número entero en JavaScript?",
        options: ["parseInt()", "Number()", "parseFloat()"],
        answer: 0
    },
    {
        question: "¿Cómo se puede comprobar si una variable `x` no está definida en JavaScript?",
        options: ["if (x != null)", "if (typeof x === 'undefined')", "if (x != undefined)"],
        answer: 1
    },
    {
        question: "¿Cuál es el resultado de console.log(2 + '2'); en JavaScript?",
        options: ["4", "\"22\"", "NaN"],
        answer: 1
    },
    {
        question: "¿Cómo puedes agregar un elemento al final de un array en JavaScript?",
        options: ["array.push()", "array.append()", "array.add()"],
        answer: 0
    },
    {
        question: "¿Cómo se puede definir una variable en PHP?",
        options: ["$variable = 'valor';", "var variable = 'valor';", "let $variable = 'valor';"],
        answer: 0
    },
    {
        question: "¿Cuál es el operador de concatenación en PHP?",
        options: ["+", "&", "."],
        answer: 2
    },
    {
        question: "¿Cuál es la forma correcta de incluir otro archivo PHP dentro de otro?",
        options: ["include 'archivo.php';", "require 'archivo.php';", "import 'archivo.php';"],
        answer: 0
    },
    {
        question: "¿Qué función se usa para obtener el número de elementos en un array en PHP?",
        options: ["length()", "sizeOf()", "count()"],
        answer: 2
    },
    {
        question: "¿Qué superglobal en PHP se usa para acceder a los datos enviados por un formulario usando el método POST?",
        options: ["$_GET", "$_POST", "$_REQUEST"],
        answer: 1
    },
    {
        question: "¿Cuál es el atributo correcto para hacer que un enlace se abra en una nueva pestaña en HTML?",
        options: ["target=\"_self\"", "target=\"_blank\"", "target=\"_top\""],
        answer: 1
    },
    {
        question: "¿Qué significa CSS?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
        answer: 1
    },
    {
        question: "¿Cómo se puede crear un comentario en CSS?",
        options: ["// Esto es un comentario", "/* Esto es un comentario */", "<!-- Esto es un comentario -->"],
        answer: 1
    },
    {
        question: "¿Qué propiedad en CSS controla el tamaño del texto?",
        options: ["font-style", "font-size", "text-size"],
        answer: 1
    },
    {
        question: "¿Cuál es el tag correcto para una tabla en HTML?",
        options: ["<table>", "<tbl>", "<tab>"],
        answer: 0
    }
    
];

let currentQuestion = 0;
let score = 0;
let scores = JSON.parse(localStorage.getItem('highScores')) || [];

function displayHighScores() {
    const highScoresList = document.getElementById('high-scores-list');
    highScoresList.innerHTML = scores
        .map(score => `<li>${score.name}: ${score.score}</li>`)
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
    const questionData = questions[currentQuestion];
    document.getElementById('question-text').textContent = questionData.question;
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', function() {
            checkAnswer(index);
        });
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const questionData = questions[currentQuestion];
    if (selectedIndex === questionData.answer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('score-screen').style.display = 'block';
    document.getElementById('score').textContent = `Puntuación: ${score}/${questions.length}`;

    const name = document.getElementById('name').value;
    saveScore(name, score);
    displayHighScores();
}

function saveScore(name, score) {
    const newScore = { name: name, score: score };
    scores.push(newScore);
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 5); // Mantener solo las 5 mejores puntuaciones
    localStorage.setItem('highScores', JSON.stringify(scores));
}

// Mostrar puntuaciones al cargar la página
displayHighScores();