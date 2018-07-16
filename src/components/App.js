import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import FunctionBar from "./FunctionBar";
import Articles from "./Articles";
import Article from "./Article";
import Login from "./Login";
import * as api from "./api";
import PostArticle from "./PostArticle";
import Error from "./Error";

class App extends Component {
  state = {
    loggedIn: true,
    // user: {}
    user: {
      _id: "5b40b6d3bfcb0f5d40a035fc",
      username: "jessjelly",
      name: "Jess Jelly",
      avatar_url:
        "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
      __v: 0
    }
  };
  render() {
    return this.state.loggedIn ? (
      <div className="App">
        <FunctionBar />
        <Route exact path="/" component={Articles} />
        <Route
          exact
          path="/articles/:article_id"
          render={props => <Article {...props} userObj={this.state.user} />}
        />
        <Route
          exact
          path="/postarticle"
          render={props => <PostArticle {...props} userObj={this.state.user} />}
        />
        <Route exact path="/error" render={props => <Error {...props} />} />
      </div>
    ) : (
      <div>
        <Route
          exact
          path="/"
          render={props => <Login {...props} logIn={this.logIn} />}
        />
      </div>
    );
  }

  logIn = username => {
    api.getFromApi(`users/${username}`).then(userObj => {
      if (userObj.data.user !== null) {
        this.setState({
          loggedIn: true,
          user: userObj.data.user
        });
      }
    });
  };
}

export default App;
