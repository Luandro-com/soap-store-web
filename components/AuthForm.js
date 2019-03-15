import React, { Component } from 'react'
import { Mutation } from "react-apollo"
import LOGIN from '../queries/login.gql'
import SIGNUP from '../queries/signup.gql'
import USER from '../queries/user.gql'
import updateUserCart from '../lib/updateCart'
import AppData from './AppData'

class AuthForm extends Component {
  static contextType = AppData 
  constructor(props) {
    super(props)
    this.toggleAuth = this.toggleAuth.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  state = {
    signup: false,
    email: 'customer@example.com',
    password: 'nooneknows',
    password2: 'nooneknows'
  }

  toggleAuth() {
    this.setState({
      signup: !this.state.signup
    })
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render() {
    const { signup, email, password, password2 } = this.state
    const { action } = this.props
    return (
      <AppData.Consumer>
        {({ user }) => {
          if (user && user !== 'error' && user !== 'loading') {
            action()
            return <h3>Redirecting...</h3>
          }
          return (
            <Mutation
              mutation={signup ? SIGNUP : LOGIN}
              // update={(cache, { data }) => {
              //   console.log('DATA TO WRITE', data)
              //   cache.writeQuery({
              //     query: USER,
              //     data: { user: signup ? data.signup.user : data.login.user },
              //   })
              // }}        
            >
              {(auth, { error, client }) => (
                <form autoComplete="off" onSubmit={async (e) => {
                  e.preventDefault()
                  const res = await auth({ variables: { email, password }})
                  if (signup) {
                    if (res && res.data.signup.token) {
                      updateUserCart(res.data.signup.user, res.data.signup.token, client, action)
                    }
                  } else {
                    if (res && res.data.login.token) {
                      updateUserCart(res.data.login.user, res.data.login.token, client, action)
                    }
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
                  {signup && <input
                    id="standard-password-input2"
                    label="Confirme a senha"
                    type="password"
                    value={password2}
                    onChange={this.handleChange('password2')}
                    margin="normal"
                  />}
                  <hr />
                  <button size="small" color="primary" type="submit">
                    {signup ? 'Cadastrar' : 'Entrar'}
                  </button>
                  {error && <h6>Erro!</h6>}
                  <button size="small" color="primary" onClick={e => {
                    e.preventDefault()
                    this.toggleAuth()
                  }}>
                  {signup ? 'Login' : 'Cadastrar'}
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

export default AuthForm

