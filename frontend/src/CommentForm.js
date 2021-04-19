import React from "react";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { commentText: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ commentText: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = new URLSearchParams();
    data.append("comment", this.state.commentText);
    let path = `/question/${this.state.id}/comment`;
    fetch(path, { method: "POST", body: data }).then(
      this.setState({ commentText: "" })
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="comment-form" class="col-9">
        <input
          onChange={this.handleChange}
          type="textarea"
          class="form-control"
          name="comment"
          placeholder="Leave a comment here"
          value={this.state.commentText}
        />
        <input
          class="btn btn-secondary"
          type="submit"
          name="submit-comment"
          value="Post Comment"
        />
      </form>
    );
  }
}

export default CommentForm;