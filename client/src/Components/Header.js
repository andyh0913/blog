import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Header extends Component {
  render() {
    const log = this.props.username?'Logout':'Login';
    const target = this.props.username?'/':'/signin';
    const newpost = ()=>{
      if(this.props.username){
        this.props.history.push('/newpost');
      }
      else{
        window.alert("Please sign in first!");
      }
    }
    const homedirect = ()=>{
      this.props.history.push('/');
    }
    return (
      <div className="Header">
        <h1>Web Programming HW5</h1>
        <p>{this.props.username}</p>
        <p onClick={ homedirect }>View Articles</p>
        <p onClick={ newpost }>New Post</p>
        <a href={target}>{log}</a>
      </div>
    )
  }
}

export default withRouter(Header);