import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h1>Web Programming HW5</h1>
        <p>{this.props.username}</p>
        <p>View Articles</p>
        <p>New Post</p>
        <a href="/signin">Login</a>
      </div>
    )
  }
}
