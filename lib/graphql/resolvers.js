import { checkToken } from '../auth'
import LOCAL_CART from '../../queries/localCart.gql'

export const resolvers = {
  Query: {
    localCart: () => [],
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
    addOrRemoveFromCart: (_, { productId, quantity }, { cache }) => {
      const { localCart } = cache.readQuery({ query: LOCAL_CART })
      const data = {
        localCart: localCart.includes(productId)
          ? localCart.filter(i => i !== productId)
          : [...localCart, { __typename: 'localCart', product: productId, quantity }],
      }
      console.log('DATA', data)
      cache.writeQuery({ query: LOCAL_CART, data })
      return data.localCart
    },
  },
}
