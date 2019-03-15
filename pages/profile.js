import React, { Component } from 'react'
import Router from 'next/router'
import App from '../components/App'
import Loading from '../components/Loading'
import AppData from '../components/AppData'

class Profile extends Component {
    render () {
      return (
        <App>
          <AppData.Consumer>
            {({ user }) => {
              if (user) {
                return <div>
                  <h1>Perfil</h1>
                  <h3>{user.email}</h3>
                </div>
              } else {
                Router.push('/login')
                return <h3>Redirecionando...</h3>
              }
            }}
          </AppData.Consumer>
        </App>
      )
    }
}

export default Profile