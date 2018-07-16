import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as api from "./api";
import VoteButton from "./VoteButton";

class Articles extends Component {
  // get articles by id first, then get by topic if topics is selected.
  state = {
    articles: [],
    topicsSelected: false,
    topics: []
  };

  componentDidMount() {
    Promise.all([api.getFromApi("articles"), api.getFromApi("topics")]).then(
      ([articlesObj, topicsObj]) => {
        this.setState({
          articles: articlesObj.data["articles"],
          topics: topicsObj.data["topics"]
        });
      }
    );
  }

  render() {
    const { articles, topics, topicsSelected } = this.state;
    if (this.state.articles.length > 0) {
      return (
        <div>
          {/* Drop down for all article or articles by topics ------------------------------------------- */}
          <select onChange={this.toggleTopics}>
            <option defaultValue="selected">All</option>
            <option>Topics</option>
          </select>

          {/* Drop down for topics, conditionally rendered when topics is selected from the above drop ------------------------------------------- */}
          {topicsSelected && (
            <select
              id="topicSelection"
              onChange={event => this.getArticlesByTopic(event.target.value)}
            >
              <option defaultValue="selected">Select topics</option>
              {topics.map(topic => {
                return (
                  <option value={topic.slug} key={topic._id}>
                    {topic.title}
                  </option>
                );
              })}
            </select>
          )}

          {/* <select>
          <option value>Popular</option>
          <option>And another thing that's not recent because I don't have date on it you mug</option>
        </select> */}
          <Link to="/postarticle">
            <h3>Post Article</h3>
          </Link>

          {articles.map(articleObj => {
            return (
              <div key={articleObj._id}>
                <p>Created by: {articleObj.created_by.username}</p>
                <p>Topic: {articleObj.belongs_to}</p>
                {/* I need to modify my backend to get the username with the articles instead of the user_id */}
                <VoteButton
                  direction="up"
                  route="articles"
                  _id={articleObj._id}
                  updateState={this.updateState}
                  voted={articleObj.voted}
                />
                <VoteButton
                  direction="down"
                  route="articles"
                  _id={articleObj._id}
                  updateState={this.updateState}
                  voted={articleObj.voted}
                />
                <p>{articleObj.votes}</p>
                <Link to={`/articles/${articleObj._id}`}>
                  <h3>{articleObj.title}</h3>
                </Link>
                <p>{articleObj.body}</p>
                <p>Comments: {articleObj.comments || articleObj.count}</p>
                <p>
                  {" "}
                  +--------------------------------------------------------+{" "}
                </p>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  toggleTopics = () => {
    this.state.topicsSelected
      ? api.getFromApi("articles").then(articleObj => {
          this.setState({
            articles: articleObj.data.articles,
            topicsSelected: !this.state.topicsSelected
          });
        })
      : this.setState({
          topicsSelected: !this.state.topicsSelected
        });
  };

  getArticlesByTopic = value => {
    api.getFromApi(`topics/${value}/articles`).then(articlesByTopicObj => {
      this.setState({
        articles: articlesByTopicObj.data.articles
      });
    });
  };

  updateState = (direction, _id) => {
    const newArticles = this.state.articles.map(article => {
      let newVoted = article.voted;
      let newVotes = article.votes;
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
      return article._id === _id
        ? { ...article, voted: newVoted, votes: newVotes }
        : { ...article };
    });
    this.setState({
      articles: newArticles
    });
  };
}

export default Articles;
