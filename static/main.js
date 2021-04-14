function renderQuestion(q) {
  let existing = document.getElementById(`question-${q["id"]}`);
  if (existing === null) {
    let questionTemplate = document.getElementById("question-template");
    let node = questionTemplate.content.firstElementChild.cloneNode(true);
    node.id = `question-${q["id"]}`;

    let qText = node.querySelector(".question-text-inner");
    qText.innerText = q["text"];

    let upvotes = node.querySelector(".upvotes");
    upvotes.innerText = q["upvotes"];

    // Set up form fields
    let commentForm = node.querySelector("#comment-form");
    commentForm.id = `comment-form-${q["id"]}`;
    commentForm.addEventListener("submit", submitCommentBuilder(q["id"]));

    let commentContainer = node.querySelector(".comment-container");
    loadComments(commentContainer, q["id"]);

    // Add upvote event listener
    let upvoteButton = node.querySelector(".upvote-button");
    upvoteButton.addEventListener("click", (event) => {
      let data = new URLSearchParams();
      data.append("upvotes", 1);
      fetch(`/question/${q["id"]}`, { method: "PATCH", body: data })
        .then((response) => response.json())
        .then((data) => {
          let num = upvoteButton.querySelector(".upvotes");
          num.innerText = data["upvotes"];
        });
    });

    document.getElementById("question-container").appendChild(node);
  } else {
    let upvotes = existing.querySelector(".upvotes");
    upvotes.innerText = q["upvotes"];

    let commentContainer = existing.querySelector(".comment-container");
    loadComments(commentContainer, q["id"]);
  }
}

function renderQuestions(questionArray) {
  for (x = 0; x < questionArray.length; x++) {
    renderQuestion(questionArray[x]);
  }
}

function loadQuestions() {
  fetch(`/question`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderQuestions(data);
    });
}

function submitQuestion(event) {
  event.preventDefault();
  let form = document.getElementById("question-form");
  let data = new URLSearchParams();
  let questionText = document.querySelector(
    "#question-form input[type=textarea]"
  );
  data.append("question", questionText.value);
  fetch("/question", { method: "POST", body: data }).then((data) => {
    loadQuestions();
    questionText.value = "";
  });
}

function renderComment(container, comment) {
  let commentTemplate = document.getElementById("comment-template");
  let node = commentTemplate.content.firstElementChild.cloneNode(true);
  let p = node.querySelector("p");
  p.innerText = comment["text"];

  container.appendChild(node);
}

function loadComments(container, questionId) {
  fetch(`/question/${questionId}/comment`)
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = "";
      for (i = 0; i < data.length; i++) {
        renderComment(container, data[i]);
      }
      console.log(data);
    });
}

function submitCommentBuilder(questionId) {
  return function (event) {
    event.preventDefault();
    let form = document.getElementById(`comment-form-${questionId}`);
    let data = new URLSearchParams();
    let commentText = form.querySelector("input[type=textarea]");
    data.append("comment", commentText.value);
    fetch(`/question/${questionId}/comment`, {
      method: "POST",
      body: data,
    }).then((data) => {
      console.log(commentText);
      commentText.value = "";
      loadQuestions();
    });
  };
}

window.onload = function () {
  const form = document.getElementById("question-form");
  form.addEventListener("submit", submitQuestion);
  loadQuestions();

  // Reload all questions every 30s
  window.setInterval(loadQuestions, 30000);
};
