import React, { Component } from "react";

class Login extends Component {
  state = {
    username: ""
  };
  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            value={this.state.username}
            onChange={this.updateUsername}
            placeholder="username"
          />
          <button type="button" onClick={this.checkUsernameAndClear}>
            Login
          </button>
        </form>
      </div>
    );
  }

  checkUsernameAndClear = () => {
    this.props.logIn(this.state.username);
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
