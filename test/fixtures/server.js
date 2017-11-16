import express from 'express'
import path from 'path'
import Debug from 'debug'
import Promise from 'bluebird'
import _ from 'lodash'
import bodyParser from 'body-parser'
import iconv from 'iconv-lite'
import zlib from 'zlib'

let debug = Debug('wd:fixtures:server')
let app = express()
let staticPath = path.resolve(__dirname, '../../node_modules')

app.use(bodyParser.raw({
  type: 'text/plain'
}))

app.use(function (req, res, next) {
  debug(req.method, req.originalUrl, 'requested')
  next()
})

app.use(express.static(__dirname))
app.use('/node_modules', express.static(staticPath))

app.get('/wellformed', (req, res) => {
  var html = '<html><head></head><body>foo</body></html>'
  res.set('content-type', 'text/html').end(html)
})

app.get('/emptyhtml', (req, res) => {
  var html = '<html></html>'
  res.set('content-type', 'text/html').end(html)
})

app.get('/css', (req, res) => {
  var css = 'div{color: red}'
  res.set('content-type', 'text/stylesheet').end(css)
})

app.get('/reflect', (req, res) => {
  _.forEach(req.headers, (val, key) => {
    res.set(key, val)
  })
  res.status(200).end('ok')
})

app.post('/reflect', (req, res) => {
  _.forEach(req.headers, (val, key) => {
    res.set(key, val)
  })
  res.status(200).end(req.body)
})

app.get('/utf8', (req, res) => {
  res.set('content-type', 'text/html')
  res.end('你好世界')
})

app.get('/gbk', (req, res) => {
  let buffer = iconv.encode('你好世界', 'gbk')
  res.set('Content-Type', 'text/html; charset=gb2312')
  res.end(buffer, 'binary')
})

app.get('/binary', (req, res) => {
  let buffer = iconv.encode('你好世界', 'gbk')
  res.end(buffer, 'binary')
})

app.get('/gzip', (req, res) => {
  Promise
  .fromCallback(cb => zlib.gzip(Buffer.from('你好世界'), cb))
  .then(data => {
    res.set('Content-Type', 'text/html')
    res.set('Content-Encoding', 'gzip')
    res.end(data, 'binary')
  })
  .catch(err => res.status(500).json(err))
})

export default app
