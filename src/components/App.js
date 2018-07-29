import React, { Component } from "react";
import { Route } from "react-router-dom";
import FunctionBar from "./FunctionBar";
import Articles from "./Articles";
import Article from "./Article";
import Login from "./Login";
import * as api from "./api";
import PostArticle from "./PostArticle";
import Error from "./Error";
import { MyProvider, MyContext } from "./MyProvider";

class App extends Component {
  render() {
    return (
      <MyProvider>
        <MyContext.Consumer>
          {context =>
            context.state.loggedIn ? (
              <div className="container is-fluid has-background-primary">
                <FunctionBar />
                <Route exact path="/" component={Articles} />
                <Route exact path="/articles/:article_id" component={Article} />
                <Route exact path="/postarticle" component={PostArticle} />
                <Route exact path="/error" component={Error} />
              </div>
            ) : <Route exact path="/" component={Login} />
          }
        </MyContext.Consumer>
      </MyProvider>
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
