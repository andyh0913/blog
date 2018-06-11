import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Header extends Component {
  render() {
    const log = this.props.username?'Logout':'Login';
    const target = this.props.username?'/':'/signin';
    return (
      <div className="Header">
        <h1>Web Programming HW5</h1>
        <p>{this.props.username}</p>
        <p>View Articles</p>
        <p onClick={()=>{this.props.history.push("/newpost")}}>New Post</p>
        <a href={target}>{log}</a>
      </div>
    )
  }
}

export default withRouter(Header);