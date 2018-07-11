import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import FunctionBar from './FunctionBar'
import Articles from './Articles'
import Article from './Article'
import LoginSignin from './LoginSignin'

class App extends Component {
  render() {
    return (
      <div className="App">
        <FunctionBar />
        <Route exact path='/' component={Articles} />
        <Route path="/articles/:article_id" component={Article} />
        <Route path='/login' component={LoginSignin} />
      </div>
    )

  }
}

export default App;
