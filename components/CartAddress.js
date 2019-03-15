import React, { Component } from 'react'
import Input from './Input'
import Button from './Button'
import ZIP from '../queries/zip.gql'

export default class CartAddress extends Component {
  state = {
    street: '',
    number: '',
    complement: '',
    zip: '',
    district: '',
    city: '',
    state: '',
    country: '',
    firstName: '',
    lastName: '',
    country: 'Brasil'
  }
  componentDidMount() {
    if (window) {
      const zip = window.localStorage.getItem('shippingZip')
      if (zip) {
        this.getZipData(parseInt(zip))
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { user } = this.props
    if (prevProps.user !== user) {
      if (user.address && user.address.length > 0) {
        this.setState({
          ...user.address[0]
        })
      } else {
        if (user.firstName) this.setState({ firstName: user.firstName })
        if (user.lastName) this.setState({ lastName: user.lastName })
      }
    }
  }
  getZipData(zip) {
    const { client } = this.props
    client.query({
      query: ZIP,
      variables: { code: zip }
    })
    .then(res => {
      this.setState({
        zip,
        ...res.data.zip,
      })
    })
    .catch(err => {
      console.log(err)
      this.setState({
        zip,
      })
    })
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }
  render() {
    const { street, number, complement, zip, district, city, state, country, firstName, lastName } = this.state
    return (
      <div id="cart-address">
        <h1>Endereço para entrega</h1>
        <div className="section">
          <Input onChange={this.handleChange('firstName')} value={firstName} label="Primeiro nome" />
          <Input onChange={this.handleChange('lastName')} value={lastName} label="Sobrenome" />
        </div>
        <div className="section">
          <Input onChange={this.handleChange('zip')} value={zip} label="CEP" />
          <Input onChange={this.handleChange('district')} value={district} label="Bairro" />
          <Input onChange={this.handleChange('city')} value={city} label="Cidade" />
          <Input onChange={this.handleChange('state')} value={state} label="UF" />
        </div>
        <div className="section">
          <Input onChange={this.handleChange('street')} value={street} label="Rua" />
          <Input onChange={this.handleChange('number')} value={number} label="Número" />
        </div>
        <Button onClick={() => console.log('FINISH THIM', this.state)}>Finalizar compra</Button>
        <style jsx>{`
          h1 {
            padding: 20px 0;
          }
          .section {
            display: flex;
            flex-flow: row nowrap;
            padding: 35px 0;
          }
          .section * {
            width: 45%;
          }
        `}</style>
      </div>
    )
  }
}