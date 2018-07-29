import React, { Component } from "react";
import * as api from "./api";
import VoteButton from "./VoteButton";
import axios from "axios";
import { MyContext } from "./MyProvider";

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
  }

  render() {
    const { comments } = this.state;
    return (
      <MyContext.Consumer>
        {context => (
          <div>
            {comments.map((comment, index) => {
              return (
                <article className='media has-background-grey-lighter'>
                  {/* creator and days since creation */}
                  <figure className='media-left' key={comment._id}>
                    <p>OP:</p>
                    <p>{comment.created_by}</p>
                    <p>Created:</p>
                    <p>
                      {Math.round(
                        (this.state.timeNow - comment.created_at) /
                          1000 /
                          60 /
                          60 /
                          24
                      )}{" "}
                      days ago
                    </p>
                  </figure>
                  {/* comment body and delete button */}
                  {comment.belongs_to && (
                    <div className='media-content' >
                      <div className='content'>
                        <p>{comment.body}</p>   
                      </div>
                      {comment.belongs_to &&
                      context.state.user.username === comment.created_by && (
                        <button
                          className='delete is-medium'
                          onClick={this.deleteComment}
                          type="button"
                          id={comment._id}
                          name={index}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                  {/* vote count and buttons */}
                  <figure className='media-right has-text-centered'>
                    <VoteButton
                      direction="up"
                      route="comments"
                      _id={comment._id}
                      updateState={this.updateState}
                      voted={comment.voted}
                    />
                    <p>{comment.votes}</p>
                    <VoteButton
                      direction="down"
                      route="comments"
                      _id={comment._id}
                      updateState={this.updateState}
                      voted={comment.voted}
                    />
                  </figure>
                </article>
              );
            })}
          </div>
        )}
      </MyContext.Consumer>
    );
  }

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
