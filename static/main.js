function renderQuestion(q) {
    console.log(q);
    let existing = document.getElementById(`question-${q["id"]}`);
    if (existing === null) {
        let questionTemplate = document.getElementById("question-template");
        const node = questionTemplate.content.firstElementChild.cloneNode(true);
        node.id = `question-${q["id"]}`;

        let p = node.querySelector(".question .question-text");
        p.innerText = q["text"];

        let upvotes = node.querySelector(".question .upvotes");
        upvotes.innerText = q["upvotes"];
        document.getElementById("question-container").appendChild(node);
    } else {
        let upvotes = existing.querySelector(".question .upvotes");
        upvotes.innerText = q["upvotes"];
    }
}

function renderQuestions(questionArray) {
    let questionContainer = document.getElementById("question-container");
    for(x = 0; x < questionArray.length; x++) {
        renderQuestion(questionArray[x]);
    }
}

function loadQuestions() {
    fetch(`/question`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            renderQuestions(data);
            let ids = data.map(q => q["id"]);
        });
}

function submitQuestion(event) {
    console.log("running");
    event.preventDefault();
    let form = document.getElementById("question-form");
    let data = new URLSearchParams();
    let questionText = document.querySelector("#question-form input[type=textarea]");
    data.append("question", questionText.value);
    fetch("/question", { method: 'POST', body: data})
        .then(data => {
            loadQuestions();
            questionText.value = "";
        });
}

function renderComments(commentId) {
    
}

function loadComments(questionId) {
    fetch(`/question/${questionId}/comment`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        });
}

window.onload = function() {
    const form = document.getElementById("question-form");
    form.addEventListener("submit", submitQuestion);
    loadQuestions();

    // Reload all questions every 30s
    // window.setInterval(loadQuestions, 30000);
}