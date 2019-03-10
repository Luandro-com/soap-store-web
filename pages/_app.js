import App, { Container } from 'next/app'
import React from 'react'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'
import NProgress from 'nprogress'
import NextSeo from 'next-seo'
import Router from 'next/router'
import SEO from '../next-seo.config'

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

 class Store extends App {
  render () {
    const { Component, pageProps, apolloClient } = this.props
    return <Container>
      <NextSeo config={SEO} />
      <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
      </ApolloProvider>
    </Container>
  }
}

export default withApolloClient(Store)
