import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h1>Blog Title</h1>
        <p>User Name</p>
        <p>View Articles</p>
        <p>New Post</p>
        <p>Logout</p>
      </div>
    )
  }
}
