import React, { Component } from 'react'

export default class ArticleBody extends Component {
  render() {
    const info = this.props.author?this.props.author+" posted at "+this.props.time:'';
    return (
      <div className="ArticleBody">
        <p>{info}</p>
        <h2>{this.props.title}</h2>
        <br/>
        <pre>
          {this.props.content}
        </pre>
      </div>
    )
  }
}
