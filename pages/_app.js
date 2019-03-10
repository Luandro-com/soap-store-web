import App, {Container} from 'next/app'
import React from 'react'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'
import NProgress from 'next-nprogress/component'
import NextSeo from 'next-seo'
import SEO from '../next-seo.config'

 class Store extends App {
  render () {
    const { Component, pageProps, apolloClient } = this.props
    return <Container>
      <NProgress />
      <NextSeo config={SEO} />
      <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
      </ApolloProvider>
    </Container>
  }
}

export default withApolloClient(Store)
