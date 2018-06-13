import React, { Component } from 'react'
import ArticleListUnit from './ArticleListUnit'

export default class ArticleList extends Component {
  constructor(props) {
    super(props);

  }  


  render() {
    var list = [];
    for(let i=0;i<this.props.list.length;i++){
      list.push(<ArticleListUnit title={this.props.list[i].title} id={this.props.list[i]._id} handleClick={this.props.handleClick} handleReload={this.props.handleReload}/>);
    }
    return (
      <div className="ArticleList">
        {list}
      </div>
    )
  }
}
