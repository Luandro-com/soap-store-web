import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Query } from 'react-apollo'
import App from '../components/App'
import Loading from '../components/Loading'
import Price from '../components/Price'
import Input from '../components/Input'
import Button from '../components/Button'

import PRODUCT from '../queries/product.gql'

class Product extends Component {
    render () {
      if (Router.router && Router.router.query) {
        const slug = Router.router.query.slug
        return (
          <App>
            <Query query={PRODUCT} variables={{ slug }}>
              {({ data, loading, error }) => {
                if (loading) return <Loading />
                if (error) return <h2>error</h2>
                if (data) {
                  const { image, name, slug, price, description, stockQuantity } = data.product
                  console.log('data', data)
                  return (
                    <main>
                      <section>
                        <img src={image} />
                      </section>
                      <section className="info">
                        <div>
                          <h1>{name}</h1>
                          <Price style={{ color: "rgba(0,0,0,.4)", fontWeight: 900 }} value={price} />
                        </div>
                        <p>{description}</p>
                        <div>
                          <span className="quantity">Quantidade</span>
                          <br />
                          <Input
                            type="number"
                            value={{stockQuantity}}
                            width="100px"
                            background="rgba(0,0,0,.05)"
                            border="0"
                          />
                        </div>
                        <Button padding="24px 25px" margin="35px auto 0">Adicionar a cesta</Button>
                      </section>
                    </main>
                  )
                }
              }}
            </Query>
            <style jsx>{`
              main {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-around;
                padding: 5%;
              }
              h1 {
                font-family: 'proxima-nova', sans-serif;
                font-weight: 500;
                text-transform: uppercase;
              }
              .info {
                display: flex;
                flex-flow: column;
                justify-content: space-between;
              }
              .info > * {
                padding: 15px 0;
              }
              .price {
                color: rgba(0,0,0,.1);
              }
              .quantity {
                font-family: 'proxima-nova', sans-serif;
                font-weight: 500;
                text-transform: uppercase;
                color: rgba(0,0,0,.4);
                font-size: 0.8em;
              }
              @media screen and (min-width: 640px) {
                main {
                  padding: 5%;
                }
                img {
                  max-width 100%;
                }
                section {
                  max-width: 48%;
                }
              }
            `}</style>
          </App>
        )
      } else {
        return <h1>Redirecionando...</h1>
      }
    }
}

export default Product