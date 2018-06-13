import React, { Component } from 'react'
import Header from './Header'
import {withRouter} from 'react-router-dom'

class NewPostPage extends Component {
  constructor(props){
    super(props);
    this.state={
      title:'',
      content:''
    }
  }

  handleButtonClick() {
    if(!this.state.title){
      window.alert("Please fill in the title.");
      return;
    }
    if(!this.state.content){
      window.alert("Please fill in the content.");
      return;
    }
    fetch('http://localhost:3001/newpost',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "author": this.props.username,
        "title": this.state.title,
        "content": this.state.content
      })
    }).then((res)=>{
      if(!res.ok) throw new Error(res.statusText);
      //console.log("Enter handleArticleLoad");
      //console.log(res.json());
      return res.json();
    }).then((data)=>{
      console.log(data);
      window.alert(data.article.author+" posted a new article: "+data.article.title);
      this.props.history.push('/');
      
    }).catch((err)=>{
      console.log("Sign in error", err);
    })
  }

  render() {
    return (
      <div className="NewPostPage">
        <Header username={this.props.username}/>
        <div className="PostBox">
          <h3>Title</h3>
          <input type="text" onChange={(e)=>{this.setState({title: e.target.value})}} />
          <br/>
          <h3>Content</h3>
          <textarea rows="30" cols="50" onChange={(e)=>{this.setState({content: e.target.value})} }></textarea>
          <input type="button" onClick={this.handleButtonClick.bind(this)} value="Post" />
        </div>
      </div>
    )
  }
}

export default withRouter(NewPostPage)