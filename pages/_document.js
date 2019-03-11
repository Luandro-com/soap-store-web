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
          <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
          <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" />
          <link href="/static/proxima_nova.ttf" rel="stylesheet" />
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
   integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
   crossorigin=""/>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          /> */}
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
