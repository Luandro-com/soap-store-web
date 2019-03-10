import React, { Component } from 'react'
import Router from 'next/router'
import { Query, Mutation } from 'react-apollo'
import App from '../components/App'
import PRODUCTS from '../queries/products.gql'
import Loading from '../components/Loading'
import Banner from '../components/Banner'
import Calls from '../components/Calls'

class Home extends Component {
  render () {
    return (
      <App>
        <Query query={PRODUCTS}>
          {({ data, loading, error }) => {
            // const issues = loading ? [] : (error ? [] : data.issues)
            console.log('DATA :', data)
            return (
              <div>
                {loading && <Loading />}
                {data && <Banner items={data.products} />}
              </div>
            )
          }}
        </Query>
        {/* <Query query={OPEN_CALLS}>
          {({ data, loading, error }) => {
            const openCalls = loading ? [] : (error ? [] : data.openCalls)
            return (
              <div>
                <Calls issues={openCalls} />
              </div>
            )
          }}
        </Query> */}
      </App>
    )
  }
}

export default Home