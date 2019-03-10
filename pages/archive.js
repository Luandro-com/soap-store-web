import React, { Component } from 'react'
import Link from 'next/link'
import { Query, Mutation } from 'react-apollo'
import App from '../components/App'
import ISSUES from '../queries/issues.gql'
import Loading from '../components/Loading'
import Banner from '../components/Banner'

class Archive extends Component {
    render () {
      return (
        <App>
          <Query query={ISSUES}>
            {({ data, loading, error }) => {
              if (loading) return <Loading />
              if (error) return <h2>error</h2>
              if (data) {
                return <div className="wrapper">
                  {data.issues.map(issue => (
                    <div key={issue.id} className="container">
                      <div className="imageContainer" style={{ backgroundImage: `url(${issue.image})`}} />
                      <div className="info">
                        <Link href={`/issue?key=${issue.key}`}>
                          <a>
                            <h3>v. {issue.volume} n. {issue.number} ({issue.year})</h3>
                          </a>
                        </Link>
                      </div>
                    </div>
                  ))}
                  <style jsx>{`
                    .wrapper {
                      margin: 0 auto;
                      max-width: 650px;
                    }
                    .container {
                      padding: 15px 0;
                      display: flex;
                    }
                    .imageContainer {
                      background-size: cover;
                      background-repeat: no-repeat;
                      background-position: center;
                      width: 150px;
                      height: 250px;
                    }
                    .info {
                      padding-left: 25px;
                    }
                  `}</style>
                </div>
              }
            }}
          </Query>
        </App>
      )
    }
}

export default Archive