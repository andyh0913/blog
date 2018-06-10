import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h1>Blog Title</h1>
        <p>User Name</p>
        <input type="button" value="Logout"/>
      </div>
    )
  }
}
