import React, { Component } from 'react'
import Router from 'next/router'
import App from '../components/App'
import AuthForm from '../components/AuthForm'

class Login extends Component {
  render() {
    return (
      <App>
        <AuthForm action={() => Router.push('/')} />
      </App>
    )
  }

}

export default (Login)

