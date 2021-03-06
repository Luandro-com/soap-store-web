import React, { Component } from 'react'
import Router from 'next/router'
import App from '../components/App'
import Loading from '../components/Loading'
import Error from '../components/Error'
import AppData from '../components/AppData'
import Banner from '../components/Banner'
import ProductList from '../components/ProductList'
import Subscribe from '../components/Subscribe'

class Home extends Component {
  render () {
    return (
      <App>
        <AppData.Consumer>
          {({ user, content }) => (
            <main>
              {content && <Banner items={content.bannerImages} />}
              {!content && <Error />}
              <div className="info">
                {content && <img src={content.infoImage} />}
              </div>
              <ProductList />
              <Subscribe />
            </main>
          )}
        </AppData.Consumer>
        <style jsx>{`
          .img {
            max-width: 100%;
          }
          .info {
            padding: 30px 0;
            margin: 0 auto;
            text-align: center;
          }
          .info img {
            max-width: 95%;
          }
        `}</style>
      </App>
    )
  }
}

export default Home