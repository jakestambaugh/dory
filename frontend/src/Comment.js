import React from "react";

class Comment extends React.Component {
  render() {
    return (
      <div className="comment row">
        <div className="col-3"></div>
        <p className="col-9 border border-primary">{this.props.text}</p>
      </div>
    );
  }
}

export default Comment;
