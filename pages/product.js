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

import PRODUCT_BY_SLUG from '../queries/productBySlug.gql'
import ADD_TO_CART from '../queries/addToCart.gql'
import ADD_TO_LOCAL_CART from '../queries/addOrRemoveFromCart.gql'
import USER from '../queries/user.gql'

class Product extends Component {
  state = {
    quantity: 1,
  }
  handleChange = (name, stockQuantity) => event => {
    const { quantity } = this.state
    if (name === 'quantity' && (quantity + 1 <= stockQuantity) && (event.target.value > 0)) {
      this.setState({
        [name]: parseInt(event.target.value),
      })
    }
  }
  render () {
    const { quantity } = this.state
    let slug = null
    if (Router.router) {
      slug = Router.router.query.slug
    }
    return (
      <App>
        <AppData.Consumer>
          {({ user, cart }) => {
            if (slug) {
              console.log('CART', cart)
              return (
                <Query query={PRODUCT_BY_SLUG} variables={{ slug }}>
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
                                value={quantity}
                                onChange={this.handleChange('quantity', stockQuantity)}
                                width="100px"
                                background="rgba(0,0,0,.2)"
                                border="0"
                              />
                            </div>
                            <Mutation
                              mutation={user ? ADD_TO_CART : ADD_TO_LOCAL_CART}
                              update={(cache, { data }) => {
                                if (user) {
                                  // console.log('USER TO WRITE', user)
                                  // console.log('DATA TO WRITE', data.addToCart)
                                  let newUser = user
                                  newUser.cart = data.addToCart
                                  cache.writeQuery({
                                    query: USER,
                                    data: { user: newUser },
                                  })
                                }
                              }}    
                            >
                              {(addToCart, { error: errorAddToCart, client: clientAddToCart }) => (
                                <Button
                                  padding="24px 25px"
                                  margin="35px auto 0"
                                  onClick={async (e) => {
                                    if (user) {
                                      const res = await addToCart({ variables: { input: { productId: id, quantity }}})
                                      console.log('RES addtocart cloud', res)
                                    } else {
                                      let currentQuantity
                                      const exists = cart.findIndex(i => i.product === id)
                                      if (exists !== -1) currentQuantity = cart[exists].quantity   
                                      else currentQuantity = 0                                   
                                      const res = await addToCart({ variables: { productId: id, quantity: currentQuantity + quantity, price }})
                                      console.log('RES addtocart local', res)
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
              )
            } else {
              return <Loading />
            }
          }}
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
  }
}

export default Product