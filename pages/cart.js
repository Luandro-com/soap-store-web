import React, { Component } from 'react'
import App from '../components/App'
import AppData from '../components/AppData'
import Loading from '../components/Loading'
import Error from '../components/Error'
import Button from '../components/Button'
import CartItem from '../components/CartItem'

class Cart extends Component {
  render () {
    return (
      <App>
        <AppData.Consumer>
          {({ user, content, cart }) => (
            <main>
              <h1>Cesta</h1>
              {!content && <Error />}
              {console.log('CART', cart)}
              {!cart && <h3>Sem cesta...</h3>}
              {(cart && cart !== 'loading') && cart.map(i => <CartItem key={i.product} product={i.product} quantity={i.quantity} />)}
              {(cart && cart !== 'loading' && cart.length < 1) && <h2>Seu carrinho está vazio</h2>}
            </main>
          )}
        </AppData.Consumer>
        <style jsx>{`
          main {
            padding: 5% 5% 120px;
            margin: 0 auto;
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
          }
        `}</style>
      </App>
    )
  }
}

export default Cart