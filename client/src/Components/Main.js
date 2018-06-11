import React, { Component } from 'react'
import Header from './Header';
import Body from './Body'


export default class Main extends Component {
  constructor(props){
    super(props);
    this.state={
      username:''
    }
  }

  componentWillMount() {
    fetch("http://localhost:3000/data/signin",(req,res)=>{
      method: "POST"
    }).then((res)=>{
      return res.json();
    }).then((data)=>{
      if(data.success){
        console.log("signINyeahhhhhh");
        this.setState({username: data.user.username});
      }
    }).catch((err)=>{
      console.log("signin error",err);
    })
  }

  render() {
    return (
      <div>
        <Header username={this.state.username}/>
        <Body />
      </div>
    )
  }
}
