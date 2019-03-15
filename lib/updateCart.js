import { setToken, checkToken } from './auth'
import ADD_TO_CART from '../queries/addToCart.gql'

export default async (user, token, client, action) => {
  let localCart = null
  if (window) {
    localCart = window.localStorage.getItem('localCart')
    setToken(token)
  }
  const parsed = JSON.parse(localCart)
  // console.log('parsed', parsed)
  if(parsed && parsed.length > 0) {
    parsed.map(i => {
      client.mutate({
        mutation: ADD_TO_CART,
        variables: { input: {
          productId: i.product,
          quantity: i.quantity
        }}
      })
      .then(cartUpdate => {
        // console.log('cartUpdate', cartUpdate)
        if (window) {
          window.localStorage.removeItem('localCart')
        }
        client.writeData({ data: {
          user: {
          ...user,
          },
          cart: {
            ...cartUpdate.data.addToCart
          }
        }})
        action()
      })
      .catch(err => console.log(err))
    })
  }  
}