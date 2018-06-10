import React, { Component } from 'react'

export default class ArticleBody extends Component {
  render() {
    return (
      <div className="ArticleBody">
        <h2>{this.props.title}</h2>
        <br/>
        <pre>
          {this.props.content}
        </pre>
      </div>
    )
  }
}
