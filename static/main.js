function renderQuestions(questionArray) {
    let questionContainer = document.getElementById("question-container");
    let questionTemplate = document.getElementById("question-template");
    questionArray.forEach(q => {
        const node = questionTemplate.content.cloneNode();
        console.log(node.children());
        let p = node.querySelector(".question .question-text");
        p.innerText = q["text"];
        questionContainer.appendChild(p);
    });
}

function loadQuestions() {
    fetch(`/question`)
        .then(response => response.json())
        .then(data => {
            renderQuestions(data);
        });
}

function submitQuestion(event) {
    event.preventDefault();
    let form = document.getElementById("question-form");
    form.action = "POST";
    form.method = "/question";
    form.submit();

    loadQuestions();
}

function loadComments(questionId) {
    fetch(`/question/{questionId}/comment`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        });
}

window.onload = function() {
    loadQuestions();

    // Reload all questions every 30s
    window.setInterval(loadQuestions, 30000);
}