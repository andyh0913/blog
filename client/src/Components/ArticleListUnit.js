import React, { Component } from 'react'

export default class ArticleListUnit extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="ArticleListUnit">
        <input type="button" onClick={ ()=> {this.props.handleClick(this.props.id);} } value={this.props.title} />
      </div>
    )
  }
}
