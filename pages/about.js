import App from '../components/App'
import { Query } from 'react-apollo'
import ABOUT from '../queries/about.gql'
import Loading from '../components/Loading'

export default () => (
  <App>
    <Query query={ABOUT}>
      {({ data, loading, error }) => {
        if (loading) return <Loading />
        if (error) return <h2>error</h2>
        if (data) {
          return <article className="container">
            <div dangerouslySetInnerHTML={{__html: data.content.description }} />
          </article>
        }
      }}
    </Query>
    <style jsx>{`
      .container {
        max-width: 768px;
        margin: 0 auto;
      }
    `}</style>
  </App>
)
