import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Cards from 'react-credit-cards'
import Input from './Input'
import Button from './Button'
import Loading from './Loading'
import PAYMENT from '../queries/payment.gql'
import colors from '../lib/colors'
import 'react-credit-cards/es/styles-compiled.css'
import CartInstallments from './CartInstallments';

export default class CheckoutCard extends Component {
  state = {
    loading: false,
    number: '411111111111111',
    name: 'Fulano da Silva',
    expiry: '122030',
    cvc: '123',
    brand: null,
    installments: null,
    installmentOption: 1,
  }
  handleChange = name => event => {
    if (name === 'number' && event.target.value.length > 15 ) {
      this.getInstallments()
    }
    this.setState({
      [name]: event.target.value,
    })
  }
  getInstallments = () => {
    this.setState({
      loading: true
    })
    const { senderHash, total } = this.props
    const { number } = this.state
    console.log('senderHash', senderHash)
    const stringTotal = total.toString()
    const lastTwo = stringTotal.substr(-2)
    const first = stringTotal.substr(0, stringTotal.length -2)
    const floatTotal = parseFloat(first+'.'+lastTwo).toFixed(2)
    console.log('floatTotal', floatTotal)
    PagSeguroDirectPayment.getBrand({
      cardBin: parseInt(number),
      success: (resBrand) => {
        console.log('resBrand', resBrand.brand.name)
        this.setState({
          brand: resBrand.brand.name
        })
        //bandeira encontrada
        PagSeguroDirectPayment.getInstallments({
          amount: floatTotal,
          maxInstallmentNoInterest: 2,
          brand: resBrand.brand.name,
          success: (resInstallments) => {
            console.log('resInstallments', resInstallments.installments[resBrand.brand.name])
            this.setState({
              loading: false,
              installments: resInstallments.installments[resBrand.brand.name]       
            })
           },
          error: (response)  => {
            console.log('ERROR', response)
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

  sendPayment = (payment) => {
    const { number, name, expiry, cvc, brand, installments, installmentOption } = this.state
    const { senderHash, orderId } = this.props
    const expirationMonth = expiry.substr(0, 2)
    const expirationYear = expiry.substr(2, 6)
    this.setState({
      loading: true
    })
    PagSeguroDirectPayment.createCardToken({
      cardNumber: number, // Número do cartão de crédito
      brand, // Bandeira do cartão
      cvv: cvc, // CVV do cartão
      expirationMonth, // Mês da expiração do cartão
      expirationYear, // Ano da expiração do cartão, é necessário os 4 dígitos.
      success: (resToken) => {
        console.log('createCardToken success', resToken.card.token, senderHash, resToken.card.token)
      },
      error: (response) => {
          // Callback para chamadas que falharam.
          console.log('createCardToken Error', response)
      },
      complete: (resToken) => {
        console.log('createCardToken complete', resToken.card.token, senderHash)
        const installment = installments[installmentOption - 1]
        console.log('installment ', installment)
        const installmentNoInterest = installments.filter(i => i.interestFree).length.toString()
        let installmentStrings = installment.installmentAmount.toString().split('.')
        let installmentValue
        if (installmentStrings[1].length < 2) {
          installmentStrings[1] = installmentStrings[1] + '0'
          installmentValue = installmentStrings.join('.')
        } else {
          installmentValue = installmentStrings.join('.')
        }
        console.log(installmentNoInterest, installmentValue, orderId)
        const variables = {
          input: {
            method: 'CREDITCARD',
            orderId,
            document: '42943970204',
            paymentHash: senderHash,
            cardToken: resToken.card.token,
            holderName: name,
            holderDocument: '42943970204',
            holderBirth: '13/04/1988',
            holderPhone: '3138919559',
            billingAddressId: 'bla bla bla bla',
            installmentQuantity: installment.quantity,
            installmentValue,
            installmentNoInterest,
          }
        }
        console.log('Sending payment', variables)

        payment({ variables })
        .then(res => {
          this.setState({
            loading: false,
          })
          console.log('PAYMENT RES', res)
        })
        .catch(err => {
          this.setState({
            loading: false,
          })
          console.log('PAYMENT ERROR', err)
        })
        // Callback para todas chamadas.
      }
    })
  }

  render() {
    const { loading, number, name, expiry, cvc, brand, installments, installmentOption } = this.state
    
    return (
      <Mutation mutation={PAYMENT}>
        {((payment, { error, client }) => (
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
              {installments && <div className="shipping-select-container">
                <div className="shipping-select">
                  {installments.map((i, index) => (index+1 <= installments.length/2) && <CartInstallments {...i} key={i.quantity} installmentOption={installmentOption} handleChange={this.handleChange} />)}
                </div>
                <div className="shipping-select">
                  {installments.map((i, index) => (index+1 > installments.length/2) && <CartInstallments {...i} key={i.quantity} installmentOption={installmentOption} handleChange={this.handleChange} />)}
                </div>
              </div>}
              {loading
                ? <Loading />
                : brand
                  ? <Button onClick={() => this.sendPayment(payment)}>
                    Finalizar compra
                  </Button>
                  : ''
              }
              {error && <h3>Erro: {JSON.stringify(error)}</h3>}
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
            .shipping-select-container {
              width: 100%;
              display: flex;
              flex-flow: row nowrap;
              align-items: end;
              padding-bottom: 50px;
            }
            .shipping-select {
              width: 100%;
              display: flex;
              flex-flow: column;
              align-items: flex-start;
            }
            .shipping-select label {
              // width: 200px;
            }
            
            input[type=radio]{
              // position: absolute;
              visibility: hidden;
            }
            .check{
              position: relative;
              border: 1px solid #AAAAAA;
              border-radius: 100%;
              height: 15px;
              width: 15px;
              top: -18px;
              left: -18px;
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
          `}</style>
          </div>
        ))}
      </Mutation>
    )
  }
}