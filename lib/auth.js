import Cookies from 'js-cookie'
import Router from 'next/router'
import USER from '../queries/user.gql'

const key = 'store_token'

export const checkLoggedIn = async apolloClient => {
  console.log('apolloClient', apolloClient)
  // const data = await apolloClient(USER)
  // console.log('DATA', data)
  // return { loggedInUser: data }
}

const redirect = (context, target) => {
  if (context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: target })
    context.res.end()
  } else {
    // In the browser, we just pretend like this never even happened ;)
    // Router.replace(target)
  }
}

export const logout = (apolloClient, e) => {
  e.preventDefault()
  Cookies.remove(key)
  apolloClient.resetStore()
  console.log(Cookies.get(), key)
  apolloClient.cache.reset()
}

export const setToken = (token) => {
  return Cookies.set(key, token, { expires: 30, path: '' })
}

export const checkToken = () => {
  const key = Cookies.get(key)
  if (Object.keys(key).length === 0 && key.constructor === Object) {
    return null
  }
  return key.store_token
}
