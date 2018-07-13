import React, { Component } from "react";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import * as api from "./api";
import VoteButton from "./VoteButton";
import "./Article.css";

class Article extends Component {
  state = {
    comment: "",
    article: {}
  };

  componentDidMount() {
    // const { article_id } = this.props.match.params;
    api
      .getFromApi(`articles/${this.props.match.params.article_id}`)
      .then(articleObj => {
        this.setState({
          article: articleObj.data.articles[0]
        });
      });
  }

  render() {
    const { article } = this.state;
    if (article._id) {
      return (
        <div>
          <button>Next-></button>
          <Link to="/">Back to Articles</Link>
          <div>
            <p>OP: {article.created_by.username}</p>
            <div className="articleCreatorImg">
              <img src={article.created_by.avatar_url} alt="profile_url" />
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
                  api.postComment(
                    this.state.comment,
                    this.props.userObj,
                    this.clearComment()
                  )
                }
              >
                submit
              </button>
            </form>
            <p> +--------------------------------------------------------+ </p>
          </div>
          <Comments article_id={article._id} userObj={this.props.userObj} />
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  clearComment = () => {
    this.setState({
      comment: ""
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
