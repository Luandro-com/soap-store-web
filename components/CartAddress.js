import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Input from './Input'
import Button from './Button'
import Loading from './Loading'
import Error from './Error'
import ZIP from '../queries/zip.gql'
import SAVE_ADDRESS from '../queries/saveAddress.gql'
import USER from '../queries/user.gql'

const stateList = [
  {"nome": "Acre", "sigla": "AC"},
  {"nome": "Alagoas", "sigla": "AL"},
  {"nome": "Amapá", "sigla": "AP"},
  {"nome": "Amazonas", "sigla": "AM"},
  {"nome": "Bahia", "sigla": "BA"},
  {"nome": "Ceará", "sigla": "CE"},
  {"nome": "Distrito Federal", "sigla": "DF"},
  {"nome": "Espírito Santo", "sigla": "ES"},
  {"nome": "Goiás", "sigla": "GO"},
  {"nome": "Maranhão", "sigla": "MA"},
  {"nome": "Mato Grosso", "sigla": "MT"},
  {"nome": "Mato Grosso do Sul", "sigla": "MS"},
  {"nome": "Minas Gerais", "sigla": "MG"},
  {"nome": "Pará", "sigla": "PA"},
  {"nome": "Paraíba", "sigla": "PB"},
  {"nome": "Paraná", "sigla": "PR"},
  {"nome": "Pernambuco", "sigla": "PE"},
  {"nome": "Piauí", "sigla": "PI"},
  {"nome": "Rio de Janeiro", "sigla": "RJ"},
  {"nome": "Rio Grande do Norte", "sigla": "RN"},
  {"nome": "Rio Grande do Sul", "sigla": "RS"},
  {"nome": "Rondônia", "sigla": "RO"},
  {"nome": "Roraima", "sigla": "RR"},
  {"nome": "Santa Catarina", "sigla": "SC"},
  {"nome": "São Paulo", "sigla": "SP"},
  {"nome": "Sergipe", "sigla": "SE"},
  {"nome": "Tocantins", "sigla": "TO"}
]

export default class CartAddress extends Component {
  state = {
    street: '',
    number: '',
    complement: '',
    zip: '',
    district: '',
    city: '',
    state: 'AC',
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
    const { user } = this.props
    if (user && user.addresses && user.addresses.length > 0) {
      this.setState({
        ...user.addresses[user.addresses.length -1]
      })
    } else if (user) {
      if (user.firstName) this.setState({ firstName: user.firstName })
      if (user.lastName) this.setState({ lastName: user.lastName })
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { user } = this.props
    if (prevProps.user !== user) {
      if (user && user.addresses && user.addresses.length > 0) {
        this.setState({
          ...user.addresses[user.addresses.length -1]
        })
      } else if (user) {
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
      delete res.data.zip.__typename
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
    const { handleCheckout, user, finalizing, finalizingError, finished } = this.props
    return (
      <Mutation
        mutation={SAVE_ADDRESS}
        update={(cache, {data, error}) => {
          const cacheData = cache.readQuery({ query: USER })
          let newData = cacheData.user
          newData.addresses = cacheData.user.addresses.concat(data.saveAddress)
          cache.writeQuery({
            query: USER,
            data: { user: newData },
          })
        }}
      >
        {(saveAddress => (
          <div id="cart-address">
            <h2>Endereço para entrega</h2>
            <div className="section">
              <Input onChange={this.handleChange('firstName')} value={firstName} label="Primeiro nome" />
              <Input onChange={this.handleChange('lastName')} value={lastName} label="Sobrenome" />
            </div>
            <div className="section">
              <Input onChange={this.handleChange('zip')} value={zip} label="CEP" />
              <Input onChange={this.handleChange('district')} value={district} label="Bairro" />
              <Input onChange={this.handleChange('city')} value={city} label="Cidade" />
              <Input onChange={this.handleChange('state')} value={state} list="states" label="UF" />
              <datalist id="states">
                {stateList.map(i => <option key={i.nome} value={i.sigla} />)}
              </datalist>
            </div>
            <div className="section">
              <Input onChange={this.handleChange('street')} value={street} label="Rua" />
              <Input onChange={this.handleChange('number')} value={number} label="Número" />
            </div>
            {(!finalizing && !finished) && <Button onClick={() => handleCheckout(this.state, saveAddress)}>Finalizar compra</Button>}
            {finalizing && <Loading />}
            {finalizingError && <Error />}
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
        ))}
      </Mutation>
    )
  }
}