import React, { Component } from "react";
import * as api from "./api";
import VoteButton from "./VoteButton";
import axios from "axios";

class Comments extends Component {
  state = {
    timeNow: Date.now(),
    comments: []
  };

  componentDidMount() {
    api
      .getFromApi(`articles/${this.props.article_id}/comments`)
      .then(commentsObj => {
        const newComments = commentsObj.data.comments;
        this.setState({
          comments: newComments
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.article_id !== prevProps.article_id) {
      api
        .getFromApi(`articles/${this.props.article_id}/comments`)
        .then(commentsObj => {
          const newComments = commentsObj.data.comments;
          this.setState({
            comments: newComments
          });
        });
    }
    if (this.props.postedComment !== prevProps.postedComment) {
      this.optimisticallyRenderComments(this.props.postedComment);
    }
  }

  render() {
    const { comments } = this.state;
    const { userObj } = this.props;
    return (
      <div>
        {comments.map((comment, index) => {
          return (
            <div key={comment._id}>
              <p>OP: {comment.created_by}</p>
              <p>
                Created:{" "}
                {Math.round(
                  (this.state.timeNow - comment.created_at) /
                    1000 /
                    60 /
                    60 /
                    24
                )}{" "}
                days ago
              </p>
              {comment.belongs_to && (
                <div>
                  <VoteButton
                    direction="up"
                    route="comments"
                    _id={comment._id}
                    updateState={this.updateState}
                    voted={comment.voted}
                  />
                  <VoteButton
                    direction="down"
                    route="comments"
                    _id={comment._id}
                    updateState={this.updateState}
                    voted={comment.voted}
                  />
                </div>
              )}
              <p>{comment.votes}</p>
              <p>{comment.body}</p>
              {comment.belongs_to &&
                userObj.username === comment.created_by && (
                  <button
                    onClick={this.deleteComment}
                    type="button"
                    id={comment._id}
                    name={index}
                  >
                    Delete
                  </button>
                )}
              <p>
                {" "}
                +--------------------------------------------------------+{" "}
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  // Need to invoke this function once the api call to post the comment has resoled.
  replaceOptimisticallyRenderedComment = apiCommentObj => {
    const newComments = [...this.state.comments];
    newComments.map(comment => {
      if (comment._id === "__999__") {
        comment = apiCommentObj;
      }
      return comment;
    });
  };

  optimisticallyRenderComments = newComment => {
    this.state.comments.unshift(newComment);
    const newComments = this.state.comments;
    this.setState({
      comments: newComments
    });
  };

  deleteComment = event => {
    const { id } = event.target;
    const index = event.target.name;
    axios
      .delete(`https://calm-forest-98675.herokuapp.com/api/comments/${id}`)
      .catch(console.log);
    let newComments = this.state.comments;
    newComments.splice(index, 1);
    this.setState({
      comments: newComments
    });
  };

  updateState = (direction, comment_id) => {
    const newComments = this.state.comments.map(comment => {
      let newVoted = comment.voted;
      let newVotes = comment.votes;
      if (newVoted) {
        if (newVoted === "up") {
          newVoted = "";
          newVotes--;
        } else if (newVoted === "down") {
          newVoted = "";
          newVotes++;
        }
      } else {
        if (direction === "up") {
          newVoted = direction;
          newVotes++;
        } else if (direction === "down") {
          newVoted = direction;
          newVotes--;
        }
      }
      return comment._id === comment_id
        ? { ...comment, voted: newVoted, votes: newVotes }
        : { ...comment };
    });
    this.setState({
      comments: newComments
    });
  };
}

export default Comments;
