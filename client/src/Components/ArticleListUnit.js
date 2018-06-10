import React, { Component } from 'react'

export default class ArticleListUnit extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="ArticleListUnit">
        <p onClick={ ()=> {this.props.handleClick(this.props.id)} } >{this.props.title}</p>
      </div>
    )
  }
}
