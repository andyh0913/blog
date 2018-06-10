import React, { Component } from 'react'

export default class LoginPage extends Component {
  render() {
    return (
      <div className="LoginPage"> 
        <div className="LoginBox">
          <form>
            <div>
              
            </div>
            Account:<input type="text" name="account"/>
            password：<input type="password" name="password"/>
          </form>
        </div> 
      </div>
    )
  }
}
