import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import './App.css'
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
// import Board from './components/Board/Board'
// import Sidebar from './components/Sidebar/Sidebar'
// import Experience from './components/Experience/Experience'
import OpeningsCreate from './components/Openings/OpeningsCreate'
import OpeningIndex from './components/Openings/OpeningIndex'
import OpeningShow from './components/Openings/OpeningShow'
import UpdateOpening from './components/Openings/OpeningEdit'
import Landing from './components/Landing/Landing'
// import PostCreate from './components/Posts/PostCreate'
// import PostUpdate from './components/Posts/PostUpdate'
// import PostShow from './components/Posts/PostShow'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user}/>
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-opening' render={() => (
            <OpeningsCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <Route user={user} exact path='/openings' render={() => (
            <OpeningIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/openings/:id' render={() => (
            <OpeningShow msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/update-opening/:id' render={() => (
            <UpdateOpening msgAlert={this.msgAlert} user={user} />
          )} />
          <Route user={user} exact path='/' render={() => (
            <Landing user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
