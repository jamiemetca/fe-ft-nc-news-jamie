import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Comments from "./Comments";
import * as api from "./api";
import VoteButton from "./VoteButton";
import "./Article.css";
import { MyContext } from "./MyProvider";

class Article extends Component {
  state = {
    error: {},
    comment: "",
    article: {}
  };

  componentDidMount() {
    api
      .getFromApi(`articles/${this.props.match.params.article_id}`)
      .then(articleObj => {
        this.setState({
          article: articleObj.data.articles[0]
        });
      })
      .catch(err => {
        this.setState({
          error: {
            pathname: "/error",
            state: {
              status: err.response.status,
              message: err.response.data.message
            }
          }
        });
      });
  }

  render() {
    const { article } = this.state;
    if (this.state.error.pathname) {
      return <Redirect to={this.state.error} />;
    } else {
      if (article._id) {
        return (
          <MyContext.Consumer>
            {context => (
              <div>
                <Link to="/">Back to Articles</Link>
                <div>
                  <p>OP: {article.created_by.username}</p>
                  <div className="articleCreatorImg">
                    <img
                      src={article.created_by.avatar_url}
                      alt="profile_url"
                    />
                  </div>
                  <VoteButton
                    direction="up"
                    route="articles"
                    _id={article._id}
                    updateState={this.updateState}
                    voted={this.state.article.voted}
                  />
                  <VoteButton
                    direction="down"
                    route="articles"
                    _id={article._id}
                    updateState={this.updateState}
                    voted={this.state.article.voted}
                  />
                  <p>{article.votes}</p>
                  <h3>{article.title}</h3>
                  <p>{article.body}</p>
                  <form>
                    <input
                      type="text"
                      placeholder="comment"
                      value={this.state.comment}
                      onChange={this.updateComment}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        this.postCommentAndUpdateState(context.state.user)
                      }
                    >
                      submit
                    </button>
                  </form>
                  <p>
                    {" "}
                    +--------------------------------------------------------+{" "}
                  </p>
                </div>
                <Comments article_id={article._id} />
                {/* How do I rerender the comments? */}
              </div>
            )}
          </MyContext.Consumer>
        );
      } else {
        return <div>Loading...</div>;
      }
    }
  }

  postCommentAndUpdateState = userObj => {
    api
      .postComment(this.state.comment, userObj, this.state.article._id)
      .then(() => {
        this.setState({
          comment: ""
        });
      })
      .catch(err => {
        this.setState({
          error: {
            pathname: "/error",
            state: {
              status: err.response.status,
              message: err.response.data.message
            }
          }
        });
      });
  };

  updateComment = event => {
    let newComment = event.target.value;
    this.setState({
      comment: newComment
    });
  };

  updateState = (direction, _id) => {
    let newVoted = this.state.article.voted;
    let newVotes = this.state.article.votes;
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
    this.setState({
      article: { ...this.state.article, voted: newVoted, votes: newVotes }
    });
  };
}

export default Article;
