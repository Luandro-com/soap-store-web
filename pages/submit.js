import React, { Component } from 'react'
import Link from 'next/link'
import { Query } from "react-apollo"
import App from '../components/App'
import Button from '../components/Button'
import Loading from '../components/Loading'
import OPEN_CALLS from '../queries/openCalls.gql'
import USER_ARTICLES from '../queries/userArticles.gql'

class Submit extends Component {
  render() {
    return (
      <App>
        <Query query={OPEN_CALLS}>
          {({ loading: loadingOpenCalls, error: errorOpenCalls, data: dataOpenCalls, client }) => (
            <div className="wrapper">
              <Query query={USER_ARTICLES}>
                {({ loading: loadingUserArticles, error: errorUserArticles, data: dataUserArticles, client }) => {
                  if (loadingUserArticles) return <Loading />
                  if (!dataUserArticles || !dataUserArticles.user) {
                    return <h3>Precisa estar logado para submeter um artigo.</h3>
                  }
                  return (
                    <div className="articlesContainer">
                      <h2>Chamadas abertas</h2>
                        {(dataOpenCalls && dataOpenCalls.openCalls) && dataOpenCalls.openCalls.map(call => (
                          <div key={call.id} className="callItem">
                            <h4>{call.title}</h4>
                            <Button to={`/edit_article?issue=${call.id}`}>
                              Submeter artigo
                            </Button>
                          </div>
                        ))}
                      <h2>Artigos submetidos</h2>
                      {dataUserArticles && dataUserArticles.user && dataUserArticles.user.articles.map(article => (
                        <Link key={article.id} href={`/article?id=${article.id}`}>
                          <div className="articleItem">
                            <h4>{article.title}</h4>
                            <div className="buttons">
                              <Button to={`/edit_article?id=${article.id}`}>
                                Editar
                              </Button>
                              <Button to={`/payment?id=${article.id}`} color={1}>
                                Pagar
                              </Button>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )
                }}
              </Query>
            </div>
          )}
        </Query>
        <style jsx>{`
          .wrapper {
            margin: 0 auto;
            max-width: 650px;
          }
          .callItem {
            margin: 5px 0;
            background: rgba(0,0,0,0.1);
            padding: 20px 25px;
          }
          .articleItem {
            margin: 5px 0;
            display: flex;
            flex-flow: row no-wrap;
            align-items: center;
            justify-content: space-around;
            background: rgba(0,0,0,0.1);
            padding: 15px 5px;
          }
          .buttons > * {
            margin: 0 5px;
          }
        `}</style>
      </App>
    )
  }

}

export default (Submit)

