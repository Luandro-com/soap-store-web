import React, { Component } from 'react'
import App from '../components/App'
import AppData from '../components/AppData'
import CartList from '../components/CartList'
import CartTotal from '../components/CartTotal'
import AuthForm from '../components/AuthForm'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.toggleModal = this.toggleModal.bind(this)
    this.handleShippingValue = this.handleShippingValue.bind(this)
  }
  state = {
    shippingValue: null,
    loginModal: false,
  }
  toggleModal() {
    this.setState({
      loginModal: !this.state.loginModal
    })
  }
  handleShippingValue(shippingValue) {
    this.setState({
      shippingValue
    })
  }
  handleFinalize(user) {
    if (!user) {
      this.toggleModal()
    }
    console.log('Clicks@')

  }
  render () {
    const { shippingValue, loginModal } = this.state
    return (
      <App>
        <AppData.Consumer>
          {({ user, content, cart, client }) => {
            let total
            if(cart && cart.length > 0 && cart[0].price) {
              total = cart.reduce((acc, curr) => {
                return (curr.price * curr.quantity) + acc
              }, 0)
            } else if (cart && cart.products && cart.products.length > 0) {
              total = cart.products.reduce((acc, curr) => {
                return (curr.product.price * curr.quantity) + acc
              }, 0)
            }
            return (
              <main>
                <CartList cart={cart} content={content} user={user} />
                {(cart && cart !== 'loading' && (cart.length > 0 || (cart.products && cart.products.length > 0))) && <CartTotal
                  client={client}
                  total={total}
                  shippingValue={shippingValue}
                  handleShipping={this.handleShippingValue}
                  onClick={() => this.handleFinalize(user)}
                />}
                {!user && <div className={loginModal ? 'modal-open' : 'modal-closed'}>
                  <AuthForm action={this.toggleModal} />
                </div>}
              </main>
            )
          }}
        </AppData.Consumer>
        <style jsx>{`
          main {
            padding: 5% 5% 120px;
            margin: 0 auto;
          }
          .modal-closed {
            display: none;
          }
          .modal-open {
            position: fixed;
            width: 500px;
            height: 200px;
            top: 50%;
            left: 50%;
            margin-top: -100px; /* Negative half of height. */
            margin-left: -250px; /* Negative half of width. */
            border: 1px solid grey;
            background: white;
            padding: 30px;
          }
        `}</style>
      </App>
    )
  }
}

export default Cart