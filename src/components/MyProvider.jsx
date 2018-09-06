import React, { Component } from "react";
import * as api from "./api";

export const MyContext = React.createContext();

export class MyProvider extends Component {
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
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          logIn: username =>
            api.getFromApi(`users/${username}`).then(userObj => {
              if (userObj.data.user !== null) {
                this.setState({
                  loggedIn: true,
                  user: userObj.data.user
                });
              }
            })
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}
