import React, { Component } from 'react'
import Router from 'next/router'
import { Mutation } from "react-apollo"
import LOGIN from '../queries/login.gql'
import { setToken, checkToken } from '../lib/auth'
import App from '../components/App'
import AppData from '../components/AppData'
import ADD_TO_CART from '../queries/addToCart.gql'

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

  updateUserCart = async (res, client) => {
    let localCart = null
    if (window) {
      localCart = window.localStorage.getItem('localCart')
    }
    const parsed = JSON.parse(localCart)
    console.log('parsed', parsed)
    if(parsed && parsed.length > 0) {
      parsed.map(i => {
        client.mutate({
          mutation: ADD_TO_CART,
          variables: { input: {
            productId: i.product,
            quantity: i.quantity
          }}
        })
        .then(updateCart => {
          console.log('updated database cart', updateCart)
          console.log('merge with this', res.data.login.user)

        })
        .catch(err => console.log(err))
      })
    }
    // delete local cart from local storage
    if (window) {
      window.localStorage.removeItem('localCart')
    }
    setToken(res.data.login.token)
    client.writeData({ data: {
      user: {
        __typename: 'user',
      ...res.data.login.user,
      }
    }})
    Router.push('/')
  }

  render() {
    const { email, password } = this.state
    return (
      <App>
        <AppData.Consumer>
          {({ user }) => {
            if (user && user !== 'error' && user !== 'loading') {
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
                      this.updateUserCart(res, clientLogin)
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
      </App>
    )
  }

}

export default (Login)

