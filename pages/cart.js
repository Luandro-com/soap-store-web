import React, { Component } from 'react'
import * as Scroll from 'react-scroll'
import isEqual from 'lodash.isequal'
import App from '../components/App'
import AppData from '../components/AppData'
import CartList from '../components/CartList'
import CartTotal from '../components/CartTotal'
import AuthForm from '../components/AuthForm'
import CartAddress from '../components/CartAddress'
import SAVE_ORDER from '../queries/saveOrder.gql'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.toggleModal = this.toggleModal.bind(this)
    this.handleShippingValue = this.handleShippingValue.bind(this)
  }
  state = {
    shippingValue: null,
    loginModal: false,
    addressOpen: false,
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
  handleNext(user) {
    if (!user) {
      this.toggleModal()
    } else {
      this.setState({
        addressOpen: true
      }, () => Scroll.animateScroll.scrollMore(500, {
        duration: 500,
        delay: 100,
        smooth: true,
      }))
    }
  }
  handleCheckout = async (addressData, currentAddress, saveAddress, client, user) => {
    let mutableAddress = addressData 
    delete mutableAddress.__typename
    delete mutableAddress.type
    delete mutableAddress.id
    let shippingAddressId = currentAddress.id
    if (currentAddress) {
      delete currentAddress.__typename
      delete currentAddress.type
      delete currentAddress.id
    }
    const sameAs = isEqual(mutableAddress, currentAddress)
    if (!sameAs) {
      const res = await saveAddress({ variables: { input: { ...addressData }}})
      shippingAddressId = res.data.saveAddress.id
    }
    client.mutate({
      mutation: SAVE_ORDER,
      variables: { input: {
        cartId: user.cart.id,
        shippingAddressId,
      }}
    })
    .then(res => {
      console.log(res.data.saveOrder.id)
      const code = res.data.saveOrder.id
      const isOpenLightbox = PagSeguroLightbox(code, (e) => console.log('SUCCESS', e))
      // Redireciona o comprador, caso o navegador não tenha suporte ao Lightbox
      if (!isOpenLightbox){
          location.href="https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=" + code;
      }

      // PagSeguroLightbox({ code: res.data.saveOrder.id }, {
      //   success : (transactionCode) => {
      //     alert("success - " + transactionCode)
      //   },
      //   abort : () => {
      //     alert("abort")
      //   }
      // })
    })
    .catch(err => console.log(err))
    // saveOrder
    // open checkout box
  }
  render () {
    const { shippingValue, loginModal, addressOpen } = this.state
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
                  addressOpen={addressOpen}
                  handleShipping={this.handleShippingValue}
                  onClick={() => this.handleNext(user)}
                />}
                {!user && <div className={loginModal ? 'modal-open' : 'modal-closed'}>
                  <AuthForm action={this.toggleModal} />
                </div>}
                <div className={addressOpen ? "cart-address" : "modal-closed"}>
                  <CartAddress client={client} user={user} handleCheckout={(addressData, currentAddress, saveAddress) => this.handleCheckout(addressData, currentAddress, saveAddress, client, user)} />
                </div>
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
            z-index:9999;
          }
          .cart-address {
            padding-top: 100px;
          }
        `}</style>
      </App>
    )
  }
}

export default Cart