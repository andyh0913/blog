import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      account:'',
      password:'',
      username:''
    }
  }

  handleButtonClick() {
    if(!this.state.account){
      window.alert("Please fill in the account.");
      return;
    }
    if(!this.state.password){
      window.alert("Please fill in the password.");
      return;
    }
    if(!this.state.username){
      window.alert("Please fill in the username.");
      return;
    }
    //console.log(this.state);
    fetch('http://localhost:3001/signup',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "account": this.state.account,
        "password": this.state.password,
        "username": this.state.username
      })
    }).then((res)=>{
      if(!res.ok) throw new Error(res.statusText);
      //console.log("Enter handleArticleLoad");
      //console.log(res.json());
      return res.json();
    }).then((data)=>{
      console.log(data);
      if(data.success){
        this.props.login(data.user._id,data.user.username);
        this.props.history.push("/");
      }
      else{
        window.alert("Account \""+data.user.account+"\" has been registered!!");
      }
      
    }).catch((err)=>{
      console.log("Sign in error", err);
    })
  }

  render() {
    return (
      <div className="SigninPage"> 
          <div className="LoginBox">
            <div className="dataBox">
              <div className="labelBox">
                <label>Account:</label>
                <br/>
                <label>Password:</label>
                <br/>
                <label>Username:</label>
              </div>
              <div className="inputBox">
                <input type="text" name="account" onChange={(e)=>this.setState({account: e.target.value})}/>
                <br/>
                <input type="password" name="password" onChange={(e)=>this.setState({password: e.target.value})}/>
                <br/>
                <input type="text" name="username" onChange={(e)=>this.setState({username: e.target.value})}/>
              </div>
            </div>
            <div className="buttonBox">
              <a href="/signin">Already have an account</a>
              <input type="button" value="Sign up" onClick={this.handleButtonClick.bind(this)} />
            </div>
          </div>
      </div>
    )
  }
}

export default withRouter(SignupPage);
