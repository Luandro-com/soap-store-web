import React, { Component } from 'react'
import Router from 'next/router'
import { Mutation } from "react-apollo"
import LOGIN from '../queries/login.gql'
import updateUserCart from '../lib/updateCart'
import AppData from '../components/AppData'

class LoginForm extends Component {
  static contextType = AppData 
  state = {
    email: 'customer@example.com',
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
    const { action } = this.props
    return (
      <AppData.Consumer>
        {({ user }) => {
          if (user && user !== 'error' && user !== 'loading') {
            action()
            return <h3>Redirecting...</h3>
          }
          return (
            <Mutation mutation={LOGIN}>
              {(login, { error: errorLogin, client: clientLogin }) => (
                <form autoComplete="off" onSubmit={async (e) => {
                  e.preventDefault()
                  const res = await login({ variables: { email, password }})
                  if (res && res.data.login.token) {
                    updateUserCart(res.data.login.user, res.data.login.token, clientLogin, action)
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
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={this.handleChange('password')}
                    margin="normal"
                  />
                  <input
                    id="standard-password-input2"
                    label="Confirme a senha"
                    type="password"
                    value={password2}
                    onChange={this.handleChange('password2')}
                    margin="normal"
                  />
                  <hr />
                  <button size="small" color="primary" type="submit">
                    Entrar
                  </button>
                  {errorLogin && <h6>Erro!</h6>}
                  <button size="small" color="primary" onClick={e => {
                    e.preventDefault()
                    Router.push('/signup')
                  }}>
                  Cadastrar
                </button>
                <style jsx>{`
                  button {
                    margin: 5px 0;
                  }
                `}</style>
                </form>
              )}
            </Mutation>
          )
        }}
      </AppData.Consumer>
    )
  }

}

export default LoginForm

