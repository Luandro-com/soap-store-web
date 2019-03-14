import React, { Component } from 'react'
import App from '../components/App'
import AppData from '../components/AppData'
import CartList from '../components/CartList'
import CartTotal from '../components/CartTotal'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleShippingValue = this.handleShippingValue.bind(this)
  }
  state = {
    shippingValue: null,
  }
  handleShippingValue(shippingValue) {
    this.setState({
      shippingValue
    })
  }
  handleFinalize() {
    console.log('Clicks@')
  }
  render () {
    const { shippingValue } = this.state
    return (
      <App>
        <AppData.Consumer>
          {({ user, content, cart, client }) => {
              let total
              if(cart && cart[0].price) {
                total = cart.reduce((acc, curr) => {
                  return (curr.price * curr.quantity) + acc
                }, 0)
              } else if (cart) {
                total = cart.reduce((acc, curr) => {
                  return (curr.product.price * curr.quantity) + acc
                }, 0)
              }
            return (
              <main>
                <CartList cart={cart} content={content} user={user} />
                {(cart && cart !== 'loading' && cart.length > 0) && <CartTotal
                  client={client}
                  total={total}
                  shippingValue={shippingValue}
                  handleShipping={this.handleShippingValue}
                  onClick={this.handleFinalize}
                />}
              </main>
            )
          }}
        </AppData.Consumer>
        <style jsx>{`
          main {
            padding: 5% 5% 120px;
            margin: 0 auto;
          }
        `}</style>
      </App>
    )
  }
}

export default Cart