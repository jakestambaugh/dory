import React from "react";

import QuestionForm from "./QuestionForm";
import Question from "./Question";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
    this.getAllQuestions = this.getAllQuestions.bind(this);
  }

  getAllQuestions() {
    fetch("http://cs1520-dory.uc.r.appspot.com/question", { mode: "no-cors" })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ questions: data });
      });
  }

  componentDidMount() {
    this.getAllQuestions();
    this.timer = setInterval(this.getAllQuestions, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const questions = this.state.questions;
    return (
      <div>
        <header>
          <h1>Questions and Answers</h1>
        </header>
        <QuestionForm refreshPage={this.getAllQuestions} />
        <div className="question-container">
          {questions.map((q) => (
            <Question {...q} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
