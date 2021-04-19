import React from "react";
import ReactDOM from "react-dom";

class Question extends React.Component {
  render() {
    return (
      <div class="question row">
        <div class="question-text">
          <span class="upvote-button btn btn-secondary col-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-hand-thumbs-up-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.964.22.817.533 2.512.062 4.51a9.84 9.84 0 0 1 .443-.05c.713-.065 1.669-.072 2.516.21.518.173.994.68 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.162 3.162 0 0 1-.488.9c.054.153.076.313.076.465 0 .306-.089.626-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.826 4.826 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.616.849-.231 1.574-.786 2.132-1.41.56-.626.914-1.279 1.039-1.638.199-.575.356-1.54.428-2.59z" />
            </svg>
            <span class="upvotes"></span>
          </span>
          <h3 style="display: inline" class="question-text-inner col"></h3>
        </div>
        <div class="comment-container container"></div>
        <div class="comment-box row">
          <div class="col-3"></div>
          <form id="comment-form" class="col-9">
            <input
              type="textarea"
              class="form-control"
              name="comment"
              placeholder="Leave a comment here"
            />
            <input
              class="btn btn-secondary"
              type="submit"
              name="submit-comment"
              value="Post Comment"
            />
          </form>
        </div>
      </div>
    );
  }
}
