import React, { Component } from 'react'
import ArticleBody from './ArticleBody'
import ArticleList from './ArticleList'


export default class Body extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [],
      articleId: ''
    }
    this.handleArticleLoad = this.handleArticleLoad.bind(this);
  }
  componentWillMount() {
    console.log("Enter componenetWillMount");
    this.handleArticleLoad();
  }

  handleArticleLoad() {
    fetch('http://localhost:3001/newpost',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res)=>{
      if(!res.ok) throw new Error(res.statusText);
      console.log("Enter handleArticleLoad");
      //console.log(res.json());
      return res.json();
    }).then((data)=>{
      console.log(data.articles);
      this.setState({
        list: data.articles
      })
    }).catch((err)=>{
      console.log("Load article list error", err);
    })
  }

  setArticleId(id) {
    this.setState({
      articleId: id
    });
  }

  render() {
    const article = this.state.list.find((element)=>{
      return element._id === this.state.articleId; 
    });
    const content = article?article.content:'';
    const title = article?article.title:'';
    const author = article?article.author:'';
    const time = article?article.time:'';
    return (
      <div className="Body">
        <ArticleBody content={content} title={title} author={author} time={time}/>
        <ArticleList list={this.state.list} handleClick={this.setArticleId.bind(this)} handleReload={this.handleArticleLoad.bind(this)} />
      </div>
    )
  }
}
