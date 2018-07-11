import React, { Component } from 'react'
import Comments from './Comments'

class Article extends Component {
  state = {}
  render() {
    return <div>
      <div> This is your selected article</div>
      <Comments />
    </div>
  }
}

export default Article;