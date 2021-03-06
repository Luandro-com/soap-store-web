import React, { Component } from 'react'
import Router from 'next/router'
import App from '../components/App'
import ProductList from '../components/ProductList'
import Loading from '../components/Loading'

class Products extends Component {
  render () {
    if (Router.router && Router.router.query) {
      return (
        <App>
          <main>
            <ProductList variables={Router.router.query} />
          </main>
          <style jsx>{`
            main * {
              opacity: 0;
            }
          `}</style>
        </App>
      )
    } else {
      return <Loading />
    }
  }
}

export default Products