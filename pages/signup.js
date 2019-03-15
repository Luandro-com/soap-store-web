import React, { Component } from 'react'
import Router from 'next/router'
import updateUserCart from '../lib/updateCart'
import App from '../components/App'
import SignupForm from '../components/SignupForm'

class Signup extends Component {
  render() {
    return (
      <App>
        <SignupForm action={() => Router.push('/')} />
      </App>
    )
  }

}

export default Signup

