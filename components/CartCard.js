import React, { Component } from 'react'

export default class CartCard extends Component {
  render() {
  const { paymentMethods } = this.props
  return (
    <div>
      {Object.keys(paymentMethods).map(i => <div key={i}>
        {paymentMethods[i].options[i] && paymentMethods[i].options[i].displayName}
        {!paymentMethods[i].options[i] && Object.keys(paymentMethods[i].options).map(o => <div key={i+o}>
          {paymentMethods[i].options[o].displayName}
        </div>)}
      </div>)}
    </div>
  )
  }
}
