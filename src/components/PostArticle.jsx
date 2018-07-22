import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as api from "./api";
import { MyContext } from "./MyProvider";

class PostArticle extends Component {
  state = {
    error: {},
    title: "",
    article: "",
    topics: [],
    selectedTopic: "",
    articlePosted: false
  };

  componentDidMount() {
    api.getFromApi("topics").then(topicsObj => {
      this.setState({
        topics: topicsObj.data["topics"]
      });
    });
  }

  render() {
    if (this.state.articlePosted) {
      return (
        <div>
          <h3>Article posted</h3>
          <Link to="/">Back to Articles</Link>
        </div>
      );
    } else {
      return (
        <MyContext.Consumer>
          {context => (
            <div>
              <Link to="/">Back to Articles</Link>
              {/* Drop down to set article topic */}
              <select
                onChange={event => this.selectedTopic(event.target.value)}
              >
                <option
                  defaultValue="selected"
                  disabled={this.state.selectedTopic && "disabled"}
                >
                  Select article topic
                </option>
                {this.state.topics.map(topic => {
                  return (
                    <option value={topic.slug} key={topic._id}>
                      {topic.title}
                    </option>
                  );
                })}
              </select>
              <form>
                <input
                  type="text"
                  placeholder="Article title"
                  value={this.state.title}
                  onChange={this.updateTitle}
                />
                <input
                  type="text"
                  placeholder="Body"
                  value={this.state.article}
                  onChange={this.updateArticle}
                />
                <button
                  type="button"
                  onClick={() =>
                    this.postArticleAndUpdateState(context.state.user)
                  }
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </MyContext.Consumer>
      );
    }
  }

  postArticleAndUpdateState = userObj => {
    const newArticle = {
      title: this.state.title,
      body: this.state.article,
      belongs_to: this.state.selectedTopic,
      created_by: userObj.username
    };
    if (!Object.values(newArticle).includes("")) {
      api
        .postArticle(newArticle)
        .then(resObj => {
          if (resObj.status === 201) {
            this.setState({
              articlePosted: true
            });
          }
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
  };

  selectedTopic = value => {
    this.setState({
      selectedTopic: value
    });
  };

  updateTitle = event => {
    let newTitle = event.target.value;
    this.setState({
      title: newTitle
    });
  };

  updateArticle = event => {
    let newArticle = event.target.value;
    this.setState({
      article: newArticle
    });
  };
}

export default PostArticle;
