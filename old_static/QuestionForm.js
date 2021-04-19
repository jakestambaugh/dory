import React from "react";
import ReactDOM from "react-dom";

class QuestionForm extends React.Component {
  render() {
    return (
      <form id="question-form" class="bg-light">
        <input
          type="textarea"
          class="form-control"
          name="question"
          placeholder="Ask a question here"
        />
        <input
          class="btn-primary"
          type="submit"
          name="submit-question"
          value="Post Question"
        />
      </form>
    );
  }
}
