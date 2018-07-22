import React, { Component } from "react";
import { MyContext } from "./MyProvider";

class Login extends Component {
  state = {
    username: ""
  };
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <div>
            <form>
              <input
                type="text"
                value={this.state.username}
                onChange={this.updateUsername}
                placeholder="jessjelly"
                // username hint
              />
              <button
                type="button"
                onClick={() => this.checkUsernameAndClear(context.logIn)}
              >
                Login
              </button>
            </form>
          </div>
        )}
      </MyContext.Consumer>
    );
  }

  checkUsernameAndClear = logIn => {
    logIn(this.state.username);
    this.setState({
      username: ""
    });
  };

  updateUsername = event => {
    let newUsername = event.target.value;
    this.setState({
      username: newUsername
    });
  };
}

export default Login;
