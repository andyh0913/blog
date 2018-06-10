import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Main from './Components/Main';
import SigninPage from './Components/SigninPage'
import SignupPage from './Components/SignupPage'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      userId:'',
      username:''
    }
  }

  login(id,name) {
    this.setState({
      userId: id,
      username: name
    })
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/signin" render={()=><SigninPage login={this.login.bind(this)} />} />
          <Route exact path="/" render={()=><Main username={this.state.username} />}/>
          <Route exact path="/signup" component={SignupPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
