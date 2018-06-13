import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Main from './Components/Main';
import SigninPage from './Components/SigninPage'
import SignupPage from './Components/SignupPage'
import NewPostPage from './Components/NewPostPage'

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
          <Route exact path="/signup" render={()=><SignupPage login={this.login.bind(this)} />} />
          <Route exact path="/newpost" render={()=><NewPostPage username={this.state.username} />} />
          <Route exact path="/" render={()=><Main username={this.state.username} />}/>
        </Switch>
      </div>
    );
  }
}

export default App;
