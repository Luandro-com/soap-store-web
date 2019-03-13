import React, { Component } from 'react'
import Router from 'next/router'
import App from '../components/App'
import ProductList from '../components/ProductList'
import Contact from '../components/Contact'

class Products extends Component {
  render () {
    if (Router.router && Router.router.query) {
      return (
        <App>
          <main>
            <ProductList variables={Router.router.query} />
            <Contact />
          </main>
          <style jsx>{`
            main * {
              opacity: 0;
            }
          `}</style>
        </App>
      )
    } else {
      return <h1>Redirecionando....</h1>
    }
  }
}

export default Products