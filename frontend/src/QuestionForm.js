import React from "react";

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { questionText: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  submitQuestion(questionText, callback) {
    let data = new URLSearchParams();
    data.append("question", questionText);
    fetch("/question", { method: "POST", body: data }).then(callback);
  }

  handleChange(event) {
    this.setState({ questionText: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let callback = (data) => {
      this.setState({ questionText: "" });
    };
    this.submitQuestion(this.state.questionText, callback);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="question-form" class="bg-light">
        <input
          onChange={this.handleChange}
          type="textarea"
          class="form-control"
          name="question"
          placeholder="Ask a question here"
          value={this.state.questionText}
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

export default QuestionForm;
