import React, { Component } from 'react'

export default class ArticleListUnit extends Component {
  constructor(props){
    super(props);
  }

  handleDeleteArticle() {
    if(!window.confirm("This action is irreversible. Delete \""+this.props.title+"\" ?")){
      return;
    }
    fetch('http://localhost:3001/delete',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        _id: this.props.id
      })
    }).then((res)=>{
      if(!res.ok) throw new Error(res.statusText);
      window.alert("\""+this.props.title+"\" is deleted.");
      this.props.handleReload();
    }).catch((err)=>{
      console.log("Sign in error", err);
    })
  }

  render() {
    return (
      <div className="ArticleListUnit">
        <p onClick={ ()=> {this.props.handleClick(this.props.id)} } >{this.props.title}</p>
        <h3 onClick={ this.handleDeleteArticle.bind(this) }>X</h3>
      </div>
    )
  }
}
