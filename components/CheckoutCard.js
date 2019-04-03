import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Cards from 'react-credit-cards'
import Input from './Input'
import Button from './Button'
import PAYMENT from '../queries/payment.gql'
import 'react-credit-cards/es/styles-compiled.css'

export default class CheckoutCard extends Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }
  handlePayment = (payment) => {
    const { senderHash } = this.props
    console.log('senderHash', senderHash)
    PagSeguroDirectPayment.getBrand({
      cardBin: 411111,
      success: (resBrand) => {
        console.log('resBrand', resBrand.brand.name)
        //bandeira encontrada
        PagSeguroDirectPayment.getInstallments({
          amount: 118.80,
          maxInstallmentNoInterest: 2,
          brand: resBrand.brand.name,
          success: (resInstallments) => {
            console.log('resInstallments', resInstallments.installments[resBrand.brand.name])
            PagSeguroDirectPayment.createCardToken({
              cardNumber: '4111111111111111', // Número do cartão de crédito
              brand: 'visa', // Bandeira do cartão
              cvv: '013', // CVV do cartão
              expirationMonth: '12', // Mês da expiração do cartão
              expirationYear: '2026', // Ano da expiração do cartão, é necessário os 4 dígitos.
              success: (resToken) => {
                console.log('resToken', resToken.card.token)
                payment({ variables: { input: {
                  method: 'CREDITCARD',
                  orderId: 'String!',
                  document: 'String!',
                  paymentHash: senderHash,
                  cardToken: resToken.card.token,
                  holderName: 'String',
                  holderDocument: 'String',
                  holderBirth: 'String',
                  holderPhone: 'String',
                  billingAddressId: 'String',
                }}})
                .then(res => console.log('PAYMENT RES', res))
                .catch(err => console.log('PAYMENT ERROR', err))
              },
              error: (response) => {
                  // Callback para chamadas que falharam.
                  console.log('Error', response)
              },
              complete: (response) => {
                  // Callback para todas chamadas.
              }
            })
         },
          error: (response)  => {
               // callback para chamadas que falharam.
         },
          complete: (response) => {
              // Callback para todas chamadas.
         }
        })
      },
      error: (response) => {
        //tratamento do erro
      },
      complete: (response) => {
        //tratamento comum para todas chamadas
      }
    })
  
  }
  render() {
    const { number, name, expiry, cvc } = this.state
    return (
      <Mutation mutation={PAYMENT}>
        {(payment => (
          <div className="container">
            <div className="card">
              <Cards
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                // focused={state.focused}
              />
            </div>
            <div className="inputs">
              <div className="section">
                <Input onChange={this.handleChange('number')} value={number} label="Número do cartão" />
                <Input onChange={this.handleChange('name')} value={name} label="Nome impresso" />
              </div>
              <div className="section">
                <Input onChange={this.handleChange('expiry')} value={expiry} label="Data expiração" />
                <Input onChange={this.handleChange('cvc')} value={cvc} label="Número de segurança" />          
              </div>
              <Button onClick={() => this.handlePayment(payment)}>Finalizar compra</Button>
            </div>
          <style jsx>{`
            .container {
              width: 100%;
              padding-top: 120px ;
              display: flex;
              flex-flow: row nowrap;
              justify-content: space-between;
            }
            .card {
              width: 40%
            }
            .inputs {
              width: 60%;
            }
            .section {
              display: flex;
              flex-flow: row nowrap;
              padding: 35px 0;
            }
          `}</style>
          </div>
        ))}
      </Mutation>
    )
  }
}