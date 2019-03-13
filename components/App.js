import React, { Component } from 'react'
import Router from 'next/router'
import { Query } from 'react-apollo'
import * as gtag from '../lib/gtag'
import { logout } from '../lib/auth'
import USER from '../queries/user.gql'
import CONTENT from '../queries/content.gql'
import Header from './Header'
import Contact from './Contact'
import Loading from '../components/Loading'
import colors from '../lib/colors'
import AppData from './AppData'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

export default class extends Component {
  render() {
    return (
      <Query query={USER}>
        {({ loading: loadingUser, error: errorUser, data: dataUser, client }) => {
          let userData = loadingUser ? 'loading' : (errorUser ? 'error' : dataUser.user)
          return (
            <Query query={CONTENT}>
              {({ loading: loadingContent, error: errorContent, data: dataContent }) => {
                const contentData = loadingContent ? 'loading' : (errorContent ? 'error' : dataContent.content)
                return (
                  <main>
                    <Header user={userData} content={contentData} />
                    <AppData.Provider value={{ user: userData, content: contentData }}>
                      {this.props.children}
                    </AppData.Provider>
                    <Contact />
                    <style jsx global>{`
                      * {
                        font-family: roboto;
                      }
                      body {
                        margin: 0;
                        padding: 50px 0 0;
                      }
                      a {
                        font-family: 'proxima-nova', sans-serif;
                        font-weight: 500;
                        text-transform: uppercase;
                        border: none;
                        border-radius: 5px;
                        position: relative;
                        box-sizing: border-box;
                        transition: all 500ms ease; 
                        cursor: pointer;
                        }
                      }
                      a:before {
                        content:'';
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        width: 0px;
                        height: 42px;
                        background: rgba(255,255,255,0.3);
                        border-radius: 5px;
                        transition: all 2s ease;
                      }
                      a:hover:before {
                        width: 100%;
                      }
                      p {
                        font-size: 14px;
                        line-height: 24px;
                      }
                      article {
                        margin: 0 auto;
                        max-width: 650px;
                      }
                      button {
                        align-items: center;
                        background-color: ${colors.color4};
                        border: 0;
                        color: white;
                        display: flex;
                        padding: 5px 7px;
                      }
                      button:active {
                        background-color: #1b9db7;
                        transition: background-color 0.3s;
                      }
                      button:focus {
                        outline: none;
                      }
                      button:disabled {
                        background-color: gray;
                      }
                    `}</style>
                  </main>
                )
              }}
            </Query>
          )
        }}
      </Query>
    )
  }
}
