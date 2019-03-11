// require('@zeit/next-preact/alias')()
// const { createServer } = require('http')
// const { parse } = require('url')
// const next = require('next')

// const app = next({ dev: process.env.NODE_ENV !== 'production' })
// const handle = app.getRequestHandler()

// app.prepare()
//   .then(() => {
//     createServer((req, res) => {
//       const parsedUrl = parse(req.url, true)
//       const { pathname } = parsedUrl

//       if (pathname === '/service-worker.js') {
//         const filePath = join(__dirname, '.next', pathname)

//         app.serveStatic(req, res, filePath)
//       } else {
//         handle(req, res, parsedUrl)
//       }
//     })
//     .listen(PORT, () => {
//       console.log(`> Ready on http://localhost:${PORT}`)
//     })
//   })
const express = require('express')
const next = require('next')
const { join } = require('path')
const { parse } = require('url')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const PORT = 3000

app.prepare()
.then(() => {
  const server = express()

  server.get('/service-worker.js', (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl
    const filePath = join(__dirname, '.next', pathname)
    app.serveStatic(req, res, filePath)
  })

  server.get('/p/:category', (req, res) => {
    const actualPage = '/product'
    const queryParams = { title: req.params.category }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('/p/:category/:sub', (req, res) => {
    const actualPage = '/product'
    const queryParams = { category: req.params.category, sub: req.params.sub } 
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})

