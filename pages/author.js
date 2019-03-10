import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import App from '../components/App'
// import ISSUE from '../queries/issues.gql'
import Loading from '../components/Loading'

class ISSUE extends Component {
    render () {
      return (
        <App>
          {/* <Query query={ISSUE}>
            {({ data, loading, error }) => {
              if (loading) return <Loading />
              if (error) return <h2>error</h2>
              if (data) {
                return ( */}
                  <div>
                    <h1>ISSUE</h1>
                  </div>
                {/* )
              }
            }}
          </Query> */}
        </App>
      )
    }
}

export default ISSUE