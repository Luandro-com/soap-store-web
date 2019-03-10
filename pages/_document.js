import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import jsHttpCookie from 'cookie'

import { GA_TRACKING_ID } from '../lib/gtag'

export default class extends Document {
  static getInitialProps ({ renderPage, req }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    let token
    if (req && req.headers) {
      const cookies = req.headers.cookie
      if (typeof cookies === 'string') {
        const cookiesJSON = jsHttpCookie.parse(cookies)
        token = cookiesJSON.periodico_token
      }
    }
    return { html, head, errorHtml, chunks, styles, token }
  }

  render () {
    const { token } = this.props
    return (
      <html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}}
          />
          {/* Auth session token */}
          <script
            id="session"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(token, null, 2)
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
