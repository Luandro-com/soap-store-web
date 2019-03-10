import React, { Component } from 'react'
import App from '../components/App'
import { withRouter } from 'next/router'
import { Document, Page } from 'react-pdf'

// import { Query } from 'react-apollo'
// import ABOUT from '../queries/about.gql'
import Loading from '../components/Loading'

class Pdf extends Component {
  state = {
    page: 1,
    numPages: null,
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages })
  }

  nextPage = () => {
    const { page, numPages } = this.state
    if (page + 1 <= numPages) {
      this.setState({
        page: page + 1,
      })
    }
  }

  prevPage = () => {
    const { page, numPages } = this.state
    if (page - 1 > 0) {
      this.setState({
        page: page - 1,
      })
    }
  }

  render() {
    const { page, numPages } = this.state
    const { router: { query: { url } } } = this.props
    return (
      <App>
        <div className="container">
          <Document
            file={url}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={page} />
          </Document>
          <div className="menu">
            <button onClick={this.prevPage} disabled={!numPages}>Previous</button>
            <span>{page} / {numPages}</span>
            <button onClick={this.nextPage} disabled={!numPages}>Next</button>
          </div>
        </div>
        {/* <Query query={ABOUT}>
          {({ data, loading, error }) => {
            if (loading) return <Loading />
            if (error) return <h2>error</h2>
            if (data) {
              return <article className="container">
                <div dangerouslySetInnerHTML={{__html: data.content.description }} />
              </article>
            }
          }}
        </Query> */}
        <style jsx>{`
          .container {
            width: 768px;
            margin: 0 auto;
            display: flex;
            flex-flow: column;
            align-items: center;
          }
          .menu {
            width: 600px;
            display: flex;
            flex-flow: row no-wrap;
            justify-content: space-around;
            align-items: center;
          }
        `}</style>
      </App>
    )
  }
}

export default withRouter(Pdf)