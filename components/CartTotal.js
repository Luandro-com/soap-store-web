import React, { Component } from 'react'
import colors from '../lib/colors'
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
    shippingOption: 'pac'
  }

  componentDidMount() {
    if (window) {
      const zip = window.localStorage.getItem('shippingZip')
      if (zip) {
        this.setState({
          shippingZip: zip
        }, () => this.handleShipping())
      }
    }
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }
  handleShipping() {
    const parsedZip = parseInt(this.state.shippingZip)
    this.setState({ shippingLoading: true })
    this.props.client.query({
      query: SHIPPING,
      variables: { input: {
        originZip: 73770000,
        destinationZip: parsedZip,
        weigth: 430,
        height: 5,
        width: 5,
        length: 16,
      }}
    })
    .then(res => {
      if (window) {
        window.localStorage.setItem('shippingZip', parsedZip)
      }
      this.props.handleShipping(res.data.shipping)
      this.setState({
        shippingLoading: false,
      })
    })
    .catch(err => {
      console.log(err)
      this.setState({ shippingError: true, shippingLoading: false })
    })
  }
  render () {
    const { shippingZip, shippingError, shippingLoading, shippingOption } = this.state
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
          <div className="shipping-select">
            {Object.keys(shippingValue).map(i => {
              if (i !== "__typename") {
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="react-tips"
                      value={i}
                      checked={shippingOption === i}
                      onChange={this.handleChange('shippingOption')}
                      className="shipping-radio"
                    />
                    {i.charAt(0).toUpperCase() + i.slice(1)}
                    <div className="check"></div>
                  </label>
                )
              }
            })}
          </div>
          <h3>Entrega: <Price value={shippingValue[shippingOption].value} /> em  {shippingValue[shippingOption].deliveryDays} dias</h3>
          <h3>Total: <Price value={total + shippingValue[shippingOption].value} /></h3>
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
          .shipping-select {
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-end;
            align-items: center;
          }
          .shipping-select label {
            width: 100px;
          }
          
          input[type=radio]{
            position: absolute;
            visibility: hidden;
          }
          .check{
            position: relative;
            border: 1px solid #AAAAAA;
            border-radius: 100%;
            height: 15px;
            width: 15px;
            top: -18px;
            left: 30px;
            z-index: 5;
            transition: border .25s linear;
            -webkit-transition: border .25s linear;
          }
          
          .shipping-select:hover .check {
            border: 1px solid ${colors.color1};
          }
          .check::before {
            display: block;
            position: relative;
            content: '';
            border-radius: 100%;
            height: 5px;
            width: 5px;
            top: 5px;
            left: 0;
            margin: auto;
            transition: background 0.25s linear;
            -webkit-transition: background 0.25s linear;
          }

          input[type=radio]:checked ~ .check {
            border: 1px solid ${colors.color1};
          }

          input[type=radio]:checked ~ .check::before{
            background: ${colors.color1};
          }

          input[type=radio]:checked ~ label{
            color: ${colors.color1};
          }
          @media screen and (min-width: 640px) {
          }
        `}</style>
      </div>
    )
  }
}

export default CartTotal