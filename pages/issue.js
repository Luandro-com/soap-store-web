import React, { Component } from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Head from 'next/head'
import { Query, Mutation } from 'react-apollo'
import App from '../components/App'
import ISSUE from '../queries/issue.gql'
import Loading from '../components/Loading'

class Issue extends Component {
    render () {
      const { router: { query: { key } } } = this.props
      console.log(this.props)
      return (
        <App>
          <Query query={ISSUE} variables={{issueKey: key}}>
            {({ data, loading, error }) => {
              if (loading) return <Loading />
              if (error) return <h2>error</h2>
              if (data && data.issue) {
                const { body, id, title, selectedArticles, volume } = data.issue
                console.log(data.issue)
                return (
                  <div>
                    <h1>{title}</h1>
                    <div dangerouslySetInnerHTML={{__html: body }} />
                    {selectedArticles.map(article => <div key={article.id}>
                      {!article.file &&
                        <div>
                          Artigo sem PDF...
                        </div>
                      }
                      {article.file &&
                        <div>
                          <Link href={`/pdf?url=${article.file.url}`}><a>{article.title}</a></Link>
                          <a href={article.file.url}>📎</a>
                        </div>
                      }
                    </div>)}
                  </div>
                )
              }
            }}
          </Query>
        </App>
      )
    }
}

export default withRouter(Issue)