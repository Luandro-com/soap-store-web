import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import "react-tabs/style/react-tabs.css"

const returnName = name => {
  switch(name) {
    case 'BOLETO': return 'Boleto'
    case 'ONLINE_DEBIT': return 'Débito online'
    case 'BALANCE': return 'Pagseguro'
    case 'CREDIT_CARD': return 'Cartão de crédito'
    case 'DEPOSIT': return 'Depósito no banco'
    default: return 'Erro'
  }
}

export default class CartCard extends Component {
  render() {
  const uri = `https://stc.pagseguro.uol.com.br`
  const icon = "data:image/jpeg;base64,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"
  const { paymentMethods } = this.props
  return (
    <div>
      <h2>Pagamento</h2>
      <Tabs>
        <TabList>
          {Object.keys(paymentMethods)
            .sort((a, b) => paymentMethods[a].code - paymentMethods[b].code)
            .map(i => <Tab key={i}>{returnName(i)}</Tab>)}
        </TabList>
        {Object.keys(paymentMethods).sort((a, b) => paymentMethods[a].code - paymentMethods[b].code).map(i => <TabPanel key={i}>
          <div className="flags">
            {(paymentMethods[i].options[i] && paymentMethods[i].options[i].status === "AVAILABLE") && <div>
              {paymentMethods[i].options[i].images && <img src={uri+paymentMethods[i].options[i].images.MEDIUM.path} />}
              {!paymentMethods[i].options[i].images && <img src={icon} />}
              <span className="hidden">{paymentMethods[i].options[i].displayName}</span>
            </div>}
            {!paymentMethods[i].options[i] && Object.keys(paymentMethods[i].options).map(o => <div key={i+o}>
              {(paymentMethods[i].options[o].images && paymentMethods[i].options[o].status === "AVAILABLE") && <img src={uri+paymentMethods[i].options[o].images.MEDIUM.path} />}
              <span className="hidden">{paymentMethods[i].options[o].displayName}</span>
            </div>)}
          </div>
        </TabPanel>)}
      </Tabs>
      <style jsx>{`
        .flags {
          padding-top: 30px;
          display: flex;
          flex-flow: row wrap;
        }
        .flags img {
          max-height: 70px;
        }
      `}</style>
    </div>
  )
  }
}
