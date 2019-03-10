import React, { Component } from 'react'
import Router from 'next/router'
import { Mutation } from "react-apollo"
import LOGIN from '../queries/login.gql'
import { setToken, checkToken } from '../lib/auth'
import App, { AppData } from '../components/App'

class Login extends Component {
  static contextType = AppData 
  state = {
    email: 'reader@example.com',
    password: 'nooneknows'
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render() {
    const { email, password } = this.state
    return (
      <App>
        <AppData.Consumer>
          {({ user }) => {
            if (user) {
              Router.push('/')
              return <h3>Redirecting...</h3>
            }
            return (
              <Mutation mutation={LOGIN}>
                {(login, { error: errorLogin, client: clientLogin }) => (
                  <form autoComplete="off" onSubmit={async (e) => {
                    e.preventDefault()
                    const res = await login({ variables: { email, password }})
                    if (res && res.data.login.token) {
                      setToken(res.data.login.token)
                      clientLogin.writeData({ data: {
                        user: {
                          __typename: 'user',
                        ...res.data.login.user,
                        }
                      }})
                      Router.push('/')
                    }
                  }}>
                    <input
                      id="standard-email"
                      label="Email"
                      type="email"
                      value={email}
                      onChange={this.handleChange('email')}
                    />
                    <input
                      id="standard-password-input"
                      label="Password"
                      type="password"
                      value={password}
                      onChange={this.handleChange('password')}
                      margin="normal"
                    />
                    <hr />
                    <button size="small" color="primary" type="submit">
                      Entrar
                    </button>
                    {errorLogin && <h6>Erro!</h6>}
                  </form>
                )}
              </Mutation>
            )
          }}
        </AppData.Consumer>
      </App>
    )
  }

}

export default (Login)

