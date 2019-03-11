import React, { Component } from 'react'
import Router from 'next/router'
import { Query, Mutation } from 'react-apollo'
import App from '../components/App'
import PRODUCTS from '../queries/products.gql'
import Loading from '../components/Loading'
import Banner from '../components/Banner'
import AppData from '../components/AppData'

class Home extends Component {
  render () {
    return (
      <App>
        <AppData.Consumer>
          {({ user, content }) => (
            <Query query={PRODUCTS}>
              {({ data, loading, error }) => {
                // const issues = loading ? [] : (error ? [] : data.issues)
                return (
                  <div>
                    {loading && <Loading />}
                    {data && <Banner items={data.products} />}
                    <div className="info">
                      <img src={content.infoImage} />
                    </div>
                  </div>
                )
              }}
            </Query>
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
            max-width: 80%;
          }
        `}</style>
      </App>
    )
  }
}

export default Home