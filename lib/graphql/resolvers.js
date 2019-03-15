import { checkToken } from '../auth'
import LOCAL_CART from '../../queries/localCart.gql'

export const resolvers = {
  Query: {
    localCart: () => {
      let localCart = null
      if (window) {
        localCart = window.localStorage.getItem('localCart')
      }
      const parsed = JSON.parse(localCart)
      if (localCart) return parsed
      else return []
    },
    todos: () => [{ id: 1, text: 'Wowow', completed: false }],
    checkAuth: () => {
      return {
        __typename: 'auth',
        token: checkToken(),
        lastCheck: null      }
    },
  },
  Mutation: {
    toggleTodo: (_, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: 'TodoItem', id: variables.id })
      const fragment = gql`
        fragment completeTodo on TodoItem {
          completed
        }
      `
      const todo = cache.readFragment({ fragment, id })
      const data = { ...todo, completed: !todo.completed }
      cache.writeData({ id, data })
      return null
    },
    addOrRemoveFromCart: (_, { productId, quantity, price }, { cache }) => {
      const { localCart } = cache.readQuery({ query: LOCAL_CART })
      const existing = localCart.findIndex(i => i.product === productId)
      let data = { localCart: null }
      if (existing === -1) {
        data.localCart = [...localCart, { __typename: 'localCart', product: productId, quantity, price }]
      } else {
        if (quantity <= 0) {
          localCart.splice(existing, 1);
        } else {
          localCart[existing].quantity = quantity
        }
        data.localCart = localCart
      }
      const dataToStore = JSON.stringify(data.localCart)
      {window && window.localStorage.setItem('localCart', dataToStore)}
      // console.log('data to cache', data)
      cache.writeQuery({ query: LOCAL_CART, data })
      return data.localCart
    },
  },
}
