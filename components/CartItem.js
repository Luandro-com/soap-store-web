import React, { Component } from 'react'
import Link from 'next/link'
import { Query, Mutation } from 'react-apollo'
import Error from './Error'
import Loading from './Loading'
import Button from './Button'
import Input from './Input'
import Price from './Price'
import Close from './Close'
import PRODUCT_BY_ID from '../queries/productById.gql'
import UPDATE_LOCAL_CART from '../queries/addOrRemoveFromCart.gql'
import UPDATE_CART_ITEM from '../queries/updateCartItem.gql'
import USER from '../queries/user.gql'

function isObject(val) {
  return (typeof val === 'object');
}

class Product extends Component {
  state = {
    input: 0,
  }
  componentDidMount() {
    this.setState({
      input: this.props.quantity
    })
  }
  componentDidUpdate(prevProps, prevState) {
    const { quantity } = this.props
    if (prevProps.quantity !== quantity)
    this.setState({
      input: quantity
    })
  }
  handleChange = updateCartItem => event => {
    const { id, user } = this.props
    const value = parseInt(event.target.value)
    if (value >= 0) {
      const variableInput = user ? { input: { productId: id, quantity: value }} : { productId: id, quantity: value }
      this.setState({
        input: event.target.value,
      }, () => {
        updateCartItem({ variables: variableInput })
      })
    }
  }
  render() {
    const { name, image, price, slug, quantity, user, id } = this.props
    const { input } = this.state
    const closeInput = user ? { input: { productId: id, quantity: quantity - 1 }} : { productId: id, quantity: quantity - 1 }
    return (
      <Mutation
        mutation={user ? UPDATE_CART_ITEM : UPDATE_LOCAL_CART}
        update={(cache, { data }) => {
          let newData
          if (user) {
            let newUser = user
            newUser.cart = data.updateCartItem
            cache.writeQuery({
              query: USER,
              data: { user: newUser },
            })
          } else {
            if (data.addOrRemoveFromCart.length > 0) {
              newData = data.addOrRemoveFromCart[0].quantity
            }
          }
          this.setState({
            input: newData
          })
        }}
      >
        {(updateCartItem, { error, client }) => (
          <article>
            <Close size={30} color="rgba(0,0,0,.4)" style={{ width: '5%' }} onClick={() => updateCartItem({ variables: closeInput })} />
            <Link as={`/p/${slug}`} href={`/product?slug=${slug}`}>
              <a style={{ width: '20%' }}><img src={image} /></a>
            </Link>
            <Link as={`/p/${slug}`} href={`/product?slug=${slug}`}>
              <a style={{ width: '50%' }}><h2>{name}</h2></a>
            </Link>
            <Input type="number" width='100px' value={input || 0} onChange={this.handleChange(updateCartItem)} />
            <Price value={price * input || 0} style={{ width: '5%' }} />
            <style jsx>{`
              article {
                text-align: left;
                border-top: 1px solid rgba(0,0,0,.4);
                padding-top: 15px;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
              }
              h2 {
                font-size: 1em;
              }
            `}</style>
          </article>
        )} 
      </Mutation>
    )
  }
}

export default ({ product, quantity, user }) => {
  if (isObject(product)) {
    return <Product {...product} quantity={quantity} user={user} />
  } else {
    return (
      <Query query={PRODUCT_BY_ID} variables={{ id: product }}>
        {({ data, loading, error, client }) => {
          // const { } = data
          if (error) return <Error />
          if (loading) return <Loading />
          if (data) {
            return <Product {...data.product} quantity={quantity} />
          }
        }}
      </Query>
    )
  }
}