import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>Questions and Answers</h1>
        </header>
        <QuestionForm></QuestionForm>
        <div className="question-container"></div>
      </div>
    );
  }
}
