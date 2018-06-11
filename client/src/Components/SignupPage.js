import React, { Component } from 'react'

export default class SignupPage extends Component {
  render() {
    return (
      <div className="SigninPage"> 
        <iframe width="0" height="0" frameborder="0" name="dummyframe" id="dummyframe"></iframe>
        <form action="http://localhost:3000/data/signup" method="post" target="dummyframe">
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
                <input type="text" name="account"/>
                <br/>
                <input type="password" name="password"/>
                <br/>
                <input type="text" name="username"/>
              </div>
            </div>
            <div className="buttonBox">
              <a href="/signin">Already have an account</a>
              <input type="submit" value="Sign up" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}
