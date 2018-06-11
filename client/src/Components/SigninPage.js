import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class SigninPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      account:'',
      password:''
    }
  }

  handleButtonClick() {
    //console.log(this.state);
    fetch('http://localhost:3001/signin',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "account": this.state.account,
        "password": this.state.password
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
        window.alert("Wrong account or password!");
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
              </div>
              <div className="inputBox">
                <input type="text" name="account" onChange={(e)=>this.setState({account: e.target.value})} />
                <br/>
                <input type="password" name="password" onChange={(e)=>this.setState({password: e.target.value})} />
              </div>
            </div>
            <div className="buttonBox">
              <a href="/signup">Create a new account</a>
              <input type="button" value="Sign in" onClick={this.handleButtonClick.bind(this)}/>
            </div>
          </div>
      </div>
    )
  }
}

export default withRouter(SigninPage);
