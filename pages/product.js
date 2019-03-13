import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Query, Mutation } from 'react-apollo'
import App from '../components/App'
import AppData from '../components/AppData'
import Loading from '../components/Loading'
import Price from '../components/Price'
import Input from '../components/Input'
import Button from '../components/Button'

import PRODUCT from '../queries/product.gql'
import ADD_TO_CART from '../queries/addToCart.gql'
import ADD_TO_LOCAL_CART from '../queries/addToLocalCart.gql'

class Product extends Component {
  render () {
    if (Router.router && Router.router.query) {
      const slug = Router.router.query.slug
      return (
        <App>
          <AppData.Consumer>
            {({ user }) => (
              <Query query={PRODUCT} variables={{ slug }}>
                {({ data, loading, error }) => {
                  if (loading) return <Loading />
                  if (error) return <h2>error</h2>
                  if (data) {
                    const { id, image, name, slug, price, description, stockQuantity } = data.product
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
                          <Mutation mutation={user ? ADD_TO_CART : ADD_TO_LOCAL_CART}>
                            {(addToCart, { error: errorAddToCart, client: clientAddToCart }) => (
                              <Button
                                padding="24px 25px"
                                margin="35px auto 0"
                                onClick={async (e) => {
                                  if (user) {
                                    const res = await addToCart({ variables: { input: { productId: id, quantity: 1 }}})
                                    console.log('RES', res)
                                  } else {
                                    const res = await addToCart({ variables: { productId: id, quantity: 1 }})
                                    console.log('RES', res)
                                  }
                                }}
                              >
                                Adicionar a cesta
                              </Button>
                            )}
                          </Mutation>
                        </section>
                      </main>
                    )
                  }
                }}
              </Query>
            )}
          </AppData.Consumer>
          <style jsx>{`
            main {
              padding: 5% 0 120px;
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
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-around;
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