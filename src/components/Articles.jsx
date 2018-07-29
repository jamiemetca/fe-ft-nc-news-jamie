import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as api from "./api";
import VoteButton from "./VoteButton";
import Loading from './Loading'

class Articles extends Component {
  // get articles by id first, then get by topic if topics is selected.
  state = {
    error: {},
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
        <div className='container'>

          
          {/* Navigation bar to select topics. */}
          <nav className='level is-mobile'>
            <div className='level-item has-text-centered has-text-black has-background-grey-light box'>
            <p className='heading is-size-4' onClick={this.getAllArticles}>All</p>
            </div>
            {topics.map(topic => {
              return (
                <div className='level-item has-text-centered has-text-black has-background-grey-light box' onClick={() => this.getArticlesByTopic(topic.slug)}>
                  <p className='heading is-size-4' >{topic.title}</p>
                </div>
              )
            })}
            </nav>

          <Link  className='column is half' to="/postarticle">
              <h3 className='button'>Post Article</h3>
          </Link>

          {articles.map(articleObj => {
            return (


              <div className='columns has-background-grey-lighter' key={articleObj._id}>

                    <div className='column is-1'>
                  <p>Creator: {articleObj.created_by.username}</p>
                  <p>Topic: {articleObj.belongs_to}</p>
                    </div>

                <div className='column has-background-grey-light'>
                  <div className='content'>

                    <Link to={`/articles/${articleObj._id}`}>
                      <h3>{articleObj.title}</h3>
                    </Link>
                    <p>{articleObj.body}</p>
                    <p className='has-background-grey-lighter'>Comments: {articleObj.comments || articleObj.count}</p>
                  </div>
              </div>
                <div className='column is-1 has-text-centered'>
                    <VoteButton
                  direction="up"
                  route="articles"
                  _id={articleObj._id}
                  updateState={this.updateState}
                  voted={articleObj.voted}
                  />
                  <p className='is-size-3'>{articleObj.votes}</p>
                    <VoteButton
                  direction="down"
                  route="articles"
                  _id={articleObj._id}
                  updateState={this.updateState}
                  voted={articleObj.voted}
                  />
                  </div>
            </div>

            );
          })}
          <footer class="footer">
            <div class="content has-text-centered">
              <p>
                <strong>NC news</strong> created by <a href="https://github.com/jamiemetca">Jamie Metcalfe</a>.
                  Skills taught by <a href="https://northcoders.com/">Northcoders of Manchester</a>.
              </p>
            </div>
          </footer>
        </div>
      );
    } else {
      return <Loading/>
    }
  }

  getAllArticles = () => {
    api.getFromApi("articles").then(articleObj => {
      this.setState({
        articles: articleObj.data.articles
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
      })
  }

  getArticlesByTopic = value => {
    api.getFromApi(`topics/${value}/articles`).then(articlesByTopicObj => {
      this.setState({
        articles: articlesByTopicObj.data.articles
      });
    }).catch(err => {
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
