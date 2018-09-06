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
          <div className='container'>
            <div className='notification'>
              <nav className='level'>
                <h3 className='subtitle is-5'>{`Welcome to ${`<`} Northcoders news${`/>`}`}</h3>
                <h3 className='level-item'>Please sign in with the following default username - jessjelly</h3>
            <form className='level-item'>
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
              </nav>
            </div>
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
