import { checkToken } from '../auth'

export const defaults = {
  auth: {
    __typename: 'auth',
    token: null,
    lastCheck: null,
  },
  todos: [],
  visibilityFilter: 'SHOW_ALL',
}


export const resolvers = {
  Query: {
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
  },
}
