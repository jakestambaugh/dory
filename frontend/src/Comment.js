import React from "react";

class Comment extends React.Component {
  render() {
    return (
      <div class="comment row">
        <div class="col-3"></div>
        <p class="col-9 border border-primary">{this.props.text}</p>
      </div>
    );
  }
}

export default Comment;
