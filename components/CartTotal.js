import React, { Component } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Loading from '../components/Loading'
import Price from '../components/Price'
import SHIPPING from '../queries/shipping.gql'

class CartTotal extends Component {
  state = {
    shippingZip: 'CEP para entrega',
    shippingError: null,
    shippingLoading: false,
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }
  handleShipping(client) {
    this.setState({ shippingLoading: true })
    client.query({
      query: SHIPPING,
      variables: { input: {
        originZip: 73770000,
        destinationZip: parseInt(this.state.shippingZip),
        weigth: 430,
        height: 5,
        width: 5,
        length: 16,
      }}
    })
    .then(res => {
      this.props.handleShipping(res.data.shipping)
      this.setState({
        shippingZip: 'Mudar CEP para entrega',
        shippingLoading: false,
      })
    })
    .catch(err => {
      console.log(err)
      this.setState({ shippingError: true })
    })
  }
  render () {
    const { shippingZip, shippingError, shippingLoading } = this.state
    const { shippingValue, client, total, onClick } = this.props
    return (
      <div className="finish">
        <hr />
        {!shippingValue && <h3>Total: <Price value={total} /></h3>}
        <div className="finish-shipping">
          <Input
            onChange={this.handleChange('shippingZip')}
            width={300}
            value={shippingZip}
          />
          {shippingLoading ? <Loading /> : <Button onClick={() => this.handleShipping(client)}>Consultar entrega</Button>}
          {shippingError && <span>Erro!</span>}
        </div>
        {shippingValue && <div className="finish-total">
          <h3>Entrega: <Price value={shippingValue.pac.value} /> em  {shippingValue.pac.deliveryDays} dias</h3>
          <h3>Total: <Price value={total + shippingValue.pac.value} /></h3>
        </div>}
        <Button onClick={onClick}>Finalizar compra</Button>
        <style jsx>{`
          .finish {
            padding-top: 20px;
            text-align:right;
          }
          .finish-shipping {
            padding: 30px 0;
          }
          .finish-total {
            padding: 30px 0;
          }
          @media screen and (min-width: 640px) {
          }
        `}</style>
      </div>
    )
  }
}

export default CartTotal