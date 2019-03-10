import React, { Component } from 'react'
import Router from 'next/router'
import { Mutation } from "react-apollo"
import SIGNUP from '../queries/signup.gql'
import { setToken, checkToken } from '../lib/auth'
import App, { AppData } from '../components/App'

class Signup extends Component {
  static contextType = AppData 
  state = {
    email: 'reader@example.com',
    password: 'nooneknows',
    password2: 'nooneknows'
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render() {
    const { email, password, password2 } = this.state
    return (
      <App>
        <AppData.Consumer>
          {({ user }) => {
            if (user && user !== 'error' && user !== 'loading') {
              Router.push('/')
              return <h3>Redirecting...</h3>
            }
            return (
              <Mutation mutation={SIGNUP}>
                {(signup, { error: errorSignup, client: clientSignup }) => (
                  <form autoComplete="off" onSubmit={async (e) => {
                    e.preventDefault()
                    const res = await signup({ variables: { email, password }})
                    if (res && res.data.signup.token) {
                      setToken(res.data.signup.token)
                      clientSignup.writeData({ data: {
                        user: {
                          __typename: 'user',
                        ...res.data.signup.user,
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
                    <input
                      id="standard-password-input2"
                      label="Password"
                      type="password"
                      value={password2}
                      onChange={this.handleChange('password2')}
                      margin="normal"
                    />
                    <hr />
                    <button size="small" color="primary" type="submit">
                      Entrar
                    </button>
                    {errorSignup && <h6>Erro!</h6>}
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

export default (Signup)

