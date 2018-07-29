import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Comments from "./Comments";
import * as api from "./api";
import VoteButton from "./VoteButton";
import { MyContext } from "./MyProvider";
import Loading from './Loading'

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
                <Link className='button' to="/">Back to Articles</Link>

                <article className='media'>
                  <figure className='media-left'>
                    <p>OP: {article.created_by.username}</p>
                    <p className="image is-64x64">
                      <img
                      src={article.created_by.avatar_url}
                      alt="profile_url"
                      />
                    </p>
                  </figure>

                  <div className='media-content'>

                    <div className='content'>
                      <p>
                        <strong>{article.title}</strong>
                        <p>{article.body}</p>
                      </p>
                    </div>

                    <Comments article_id={article._id} />

                    {/* Add comment */}
                    <article className='media'>
                      <div className='media-content'>
                        <div className='field'>
                          <p className='control'>
                            <input
                              className='textarea'
                              type="text"
                              placeholder="Add a comment..."
                              value={this.state.comment}
                              onChange={this.updateComment}
                            />
                          </p>
                        </div>
                        <div className='field'>
                          <p className='control'>
                            <button
                              className='button'
                              type="button"
                              onClick={() =>
                                this.postCommentAndUpdateState(context.state.user)
                              }
                              >Post comment
                            </button>
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                    
                  {/* Article vote count and buttons */}
                  <figure className='media-right has-text-centered'>
                    <VoteButton
                      direction="up"
                      route="articles"
                      _id={article._id}
                      updateState={this.updateState}
                      voted={this.state.article.voted}
                    />
                    <p>{article.votes}</p>
                    <VoteButton
                      direction="down"
                      route="articles"
                      _id={article._id}
                      updateState={this.updateState}
                      voted={this.state.article.voted}
                    />
                  </figure>
                </article>
              </div>
            )}
          </MyContext.Consumer>
        );
      } else {
        return <Loading/>
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
