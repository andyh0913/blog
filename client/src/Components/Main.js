import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Body from './Body'
import LoginPage from './LoginPage'

export default class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/signin" component={LoginPage} />
        <Route component={Body}/>
      </Switch>
    )
  }
}
