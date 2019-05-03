import React, { Component } from 'react'
import * as Scroll from 'react-scroll'
import isEqual from 'lodash.isequal'
import App from '../components/App'
import AppData from '../components/AppData'
import AuthForm from '../components/AuthForm'
import CartList from '../components/CartList'
import CartTotal from '../components/CartTotal'
import CartAddress from '../components/CartAddress'
import CartCheckout from '../components/CartCheckout'
import SAVE_ORDER from '../queries/saveOrder.gql'

class Cart extends Component {
  state = {
    shippingOption: null,
    shippingValue: null,
    loginModal: false,
    addressOpen: false,
    finalizing: false,
    finalizingError: false,
    paymentMethods: null,
    senderHash: null,
    order: null,
  }
  toggleModal = () => {
    this.setState({
      loginModal: !this.state.loginModal
    })
  }
  handleShippingValue = (shippingValue) => {
    this.setState({
      shippingValue
    })
  }
  handleNext(user, shippingOption) {
    if (!user) {
      this.toggleModal()
    } else {
      this.setState({
        shippingOption,
        addressOpen: true
      }, () => Scroll.animateScroll.scrollMore(500, {
        duration: 500,
        delay: 100,
        smooth: true,
      }))
    }
  }
  handleCheckout = async (addressData, currentAddress, saveAddress, client, user) => {
    const { shippingValue, shippingOption } = this.state
    this.setState({
      finalizing: true,
    })
    const clean = {
      __typename: undefined,
      type: undefined,
      id: undefined,
    }
    let mutableCurrentAddress
    let mutableAddress = Object.assign({}, addressData, clean) 
    let shippingAddressId = currentAddress ? currentAddress.id : '' 
    if (currentAddress) {
      mutableCurrentAddress = Object.assign({}, currentAddress, clean)    
    }
    const sameAs = isEqual(mutableAddress, mutableCurrentAddress)
    if (!sameAs) {
      const res = await saveAddress({ variables: { input: { ...mutableAddress }}})
      shippingAddressId = res.data.saveAddress.id
    }
    console.log('SHIPPPPPPPPING', shippingValue[shippingOption].value)
    client.mutate({
      mutation: SAVE_ORDER,
      variables: { input: {
        shippingValue: shippingValue[shippingOption].value,
        shippingOption,
        cartId: user.cart.id,
        shippingAddressId,
      }}
    })
    .then(res => {
      const { totalPrice, code } = res.data.saveOrder
      this.setState({
        order: res.data.saveOrder
      })
      PagSeguroDirectPayment.setSessionId(code)
      PagSeguroDirectPayment.getPaymentMethods({
        amount: totalPrice,
        success: (response) => {
          console.log('response', response)
          this.setState({
            finalizing: false,
            paymentMethods: response.paymentMethods,
          })
          PagSeguroDirectPayment.onSenderHashReady((response) => {
            if(response.status == 'error') {
              console.log(response.message)
              return false
            }
            const hash = response.senderHash //Hash estará disponível nesta variável.
            console.log('HASH', hash)
            this.setState({
              senderHash: hash
            })
          })
        },
        error: (response) => {
          this.setState({
            finalizing: false,
            finalizingError: true,
          })
          console.log('response', response)
        },
        complete: (response) => {
          console.log('response', response)
        }
      })
      

    })
    .catch(err => {
      console.log(err)
      this.setState({
        finalizing: false,
        finalizingError: true,
      })
    })
    // saveOrder
    // open checkout box
  }
  render () {
    const { shippingValue, shippingOption, loginModal, addressOpen, finalizing, finalizingError, paymentMethods, senderHash, order } = this.state
    return (
      <App>
        <AppData.Consumer>
          {({ user, content, cart, client }) => {
            let total
            let fullTotal
            if(cart && cart.length > 0 && cart[0].price) {
              total = cart.reduce((acc, curr) => {
                return (curr.price * curr.quantity) + acc
              }, 0)
            } else if (cart && cart.products && cart.products.length > 0) {
              total = cart.products.reduce((acc, curr) => {
                return (curr.product.price * curr.quantity) + acc
              }, 0)
            }
            if (shippingOption && shippingValue) {
              fullTotal = total + shippingValue[shippingOption].value
              console.log('TOTAL + SHIPPING', fullTotal)
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
                  onClick={(shippingOption) => this.handleNext(user, shippingOption)}
                />}
                {!user && <div className={loginModal ? 'modal-open' : 'modal-closed'}>
                  <AuthForm action={this.toggleModal} />
                </div>}
                <div className={(addressOpen && !paymentMethods) ? "cart-section" : "modal-closed"}>
                  <CartAddress
                    client={client}
                    user={user}
                    finalizing={finalizing}
                    finalizingError={finalizingError}
                    finished={paymentMethods ? true : false}
                    handleCheckout={(addressData, saveAddress) => this.handleCheckout(addressData, user.addresses[0], saveAddress, client, user)} />
                </div>
                {paymentMethods && <div className={paymentMethods ? "cart-section" : "modal-closed"}>
                  <CartCheckout
                    paymentMethods={paymentMethods}
                    senderHash={senderHash}
                    total={fullTotal}
                    orderId={order.id}
                  />
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
            z-index:9999;
          }
          .cart-section {
            padding-top: 100px;
          }
        `}</style>
      </App>
    )
  }
}

export default Cart