import React, { Component } from 'react'
import axios from 'axios'

class Articles extends Component {
  state = {
    articles: [{
      belongs_to: "coding",
      body: "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
      comments: 8,
      created_by: "5b40b6d3bfcb0f5d40a035fc",
      title: "Running a Node App",
      votes: 0,
      __v: 0,
      _id: "5b40b6d3bfcb0f5d40a035fd"
    }, {
      belongs_to: "life",
      body: "The way you use axios is incorrect here, we need to set the returned value to props correctly, and we also need to bind the axios callback function properly, for example, your code should look like",
      comments: 2,
      created_by: "5b40b6d3bfcb0f5d40a045fc",
      title: "GET request in React.js to a server",
      votes: 0,
      __v: 0,
      _id: "5b40b6d3bfcb0f5d40a045fd"
    }],
    topics: []
  };
  render() {
    return (<div>
      {this.state.articles.map(articleObj => {
        return <div>
          <p>Created by: {articleObj.created_by}</p>
          {/* I need to modify my backend to get the username with the articles instead of the user_id */}
          <button type='button'>vote Up/Down</button>
          <h3>{articleObj.title}</h3>
          <p>{articleObj.body}</p>
          <p>Comments: {articleObj.comments}</p>
          <p> +---------------------------------------------------------+ </p>
        </div>
      })}

    </div >)
  }

  getArticles = () => {
    axios.get('https://calm-forest-98675.herokuapp.com/api/articles')
      .then((data) => {
        console.dir(data)
      })
  }
}

export default Articles;