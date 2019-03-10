import React, { Component } from 'react'
import Router from 'next/router'
import Iframe from 'react-iframe'
import { Query, Mutation } from "react-apollo"
import PAYMENT from '../queries/payment.gql'
import ARTICLE from '../queries/article.gql'
import App, { AppData } from '../components/App'

class Payment extends Component {
  static getInitialProps ({ renderPage, req, query }) {
    if (req) {
      return {
        id: req.url ? req.url.split('=')[1]: null
      }
    }
    if (query) {
      return {
        id: query.id
      }
    } 
  }
  static contextType = AppData 
  state = {
    url: '',
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  setUrl = (url) => this.setState({ url })

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages })
  }

  render() {
    const { url } = this.state
    const { id } = this.props
    if (id) {
      return (
        <Query query={ARTICLE} variables={{ articleId: id }}>
          {({loading, error, data}) => (
            <App>
              <AppData.Consumer>
                {({ user }) => {
                  return (
                    <Mutation mutation={PAYMENT}>
                      {(payment, { error: errorPayment, client: clientPayment }) => (
                        <form autoComplete="off" onSubmit={async (e) => {
                          e.preventDefault()
                          const res = await payment({ variables: { input: {
                            method: 'MONEY_ORDER',
                            articleId: id
                          }}})
                          console.log('RES', res)
                          if (res && res.data) {
                            this.setUrl(res.data.payment.url)
                          }
                        }}>
                          {(url || (data && data.article && data.article.payment && data.article.payment.url)) && <div className="iframe">
                          <Iframe url={url || data.article.payment.url}
                            width="450px"
                            height="450px"
                            id="myId"
                            className="myClassname"
                            display="initial"
                            position="relative"
                            allowFullScreen
                          />
                          <br />
                          <a target="_blank" href={url || data.article.payment.url}>Boleto</a>
                          </div>}
                          <hr />
                          <button size="small" color="primary" type="submit" disabled={(url || (data && data.article && data.article.payment && data.article.payment.url))}>
                            Pagar
                          </button>
                          {errorPayment && <h6>Erro!</h6>}
                          <style jsx>{`
                            .iframe {
                              margin: 0 auto;
                              text-align: center;
                            }
                          `}</style>
                        </form>
                      )}
                    </Mutation>
                  )
                }}
              </AppData.Consumer>
            </App>
          )}
        </Query>
      )
    }
  }
}

export default (Payment)

