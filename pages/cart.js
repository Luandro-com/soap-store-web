import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Query } from 'react-apollo'
import App from '../components/App'
import AppData from '../components/AppData'
import Loading from '../components/Loading'
import Price from '../components/Price'
import Input from '../components/Input'
import Button from '../components/Button'

import PRODUCT from '../queries/product.gql'

class Cart extends Component {
  render () {
    if (Router.router && Router.router.query) {
      const slug = Router.router.query.slug
      return (
        <App>
          <h1>Cesta</h1>
          <AppData.Consumer>
            {({ user, content }) => (
              <main>
                {console.log(user)}
              </main>
            )}
          </AppData.Consumer>
          <style jsx>{`
            main {
              padding: 5% 0 120px;
            }
            h1 {
              font-family: 'proxima-nova', sans-serif;
              font-weight: 500;
              text-transform: uppercase;
            }
            .info {
              display: flex;
              flex-flow: column;
              justify-content: space-between;
            }
            .info > * {
              padding: 15px 0;
            }
            .price {
              color: rgba(0,0,0,.1);
            }
            .quantity {
              font-family: 'proxima-nova', sans-serif;
              font-weight: 500;
              text-transform: uppercase;
              color: rgba(0,0,0,.4);
              font-size: 0.8em;
            }
            @media screen and (min-width: 640px) {
              main {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-around;
                padding: 5%;
              }
              img {
                max-width 100%;
              }
              section {
                max-width: 48%;
              }
            }
          `}</style>
        </App>
      )
    } else {
      return <h1>Redirecionando...</h1>
    }
  }
}

export default Cart