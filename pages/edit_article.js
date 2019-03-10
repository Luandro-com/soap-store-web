import React, { Component } from 'react'
import Router from 'next/router'
import { Mutation, Query } from "react-apollo"
import { setToken, checkToken } from '../lib/auth'
import colors from '../lib/colors'
import App from '../components/App'
import ArticleForm from '../components/ArticleForm'
import Loading from '../components/Loading'
import ARTICLE from '../queries/article.gql'
import CREATE_ARTICLE from '../queries/articleCreate.gql'
import UPDATE_ARTICLE from '../queries/articleUpdate.gql'
import PUBLISH_ARTICLE from '../queries/articlePublish.gql'


const Base = ({ children }) => (
  <App>
    <div className="wrapper">
      { children }
    </div>
    <style jsx>{`
      .wrapper {
        max-width: 948px;
        margin: 0 auto;
      }
      .uploadarea {
        padding: 15px 0;
      }
      .imageFill {
        height: 150px;
        width: 80px;
        border: 1px solid ${colors.color1};
        margin-bottom: 10px;
      }
      button {
        margin-top: 30px;
      }
    `}</style>
  </App>
)

class EditArticle extends Component {
  onSubmitCreate = async (input, createArticle, client, issueId) => {
    const res = await createArticle({ variables: { input, issueId } })
    if (res && res.data.createArticle) {
      client.writeData({ data: {
        ...res.data.createArticle
      }})
      Router.push(`/article?id=${res.data.createArticle.id}`)
    }
  }

  onSubmitUpdate = async (input, updateArticle, articleId, fileId, client) => {
    const res = await updateArticle({ variables: { input, articleId, fileId }})
    if (res && res.data.updateArticle) {
      client.writeData({ data: {
        ...res.data.updateArticle
      }})
      Router.push(`/article?id=${articleId}`)
    }
  }

  render() {
    if (Router.router && Router.router.query) {
      if (Router.router.query.id) {
        return (
          <Base>
            <Query query={ARTICLE} variables={{ articleId: Router.router.query.id }}>
              {({ loading: loadingArticle, error: errorArticle, data: dataArticle, client }) => (
                <Mutation mutation={UPDATE_ARTICLE}>
                  {(updateArticle, { error: errorUpdate, client: clientUpdate }) => (
                     <Mutation mutation={PUBLISH_ARTICLE}>
                      {(publishArticle, { error: errorPublish, client: clientPublish }) => (
                        <ArticleForm
                          error={errorUpdate || errorPublish}
                          publish={publishArticle}
                          onSubmit={(input, fileId) => this.onSubmitUpdate(input, updateArticle, Router.router.query.id, fileId, clientUpdate)}
                          initialData={loadingArticle ? null : (errorArticle ? null : dataArticle.article)}
                        />
                      )}
                    </Mutation>
                  )}
                </Mutation>
              )}
            </Query>
          </Base>
        )
      } else if (Router.router.query.issue) {
        return (
          <Base>
            <Mutation mutation={CREATE_ARTICLE}>
              {(createArticle, { error: errorCreate, client: clientCreate }) => (
                <ArticleForm
                  error={errorCreate}
                  onSubmit={input => this.onSubmitCreate(input, createArticle, clientCreate, Router.router.query.issue)}
                />
              )}
            </Mutation>
          </Base>
        )
      }
      else { return <h1>Inválido</h1>}
    } else { return <Loading />}
  }

}

export default EditArticle

