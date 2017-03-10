import express from 'express'
import bodyParser from 'body-parser'
import Endpoint from '../endpoints'
import morgan from 'morgan'
import '../endpoints/export.js'

var app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use(morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res) || '-',
  tokens['response-time'](req, res) || '-', 'ms'
].join(' ')))

app.get('/', (req, res) => res.end('web driverify running'))
app.use('/wd/hub/', Endpoint.express())

app.use(function (err, req, res, next) {
  var status = err.status || 500
  console.error(err.stack)
  res.status(status).end(err.stack)
})

export default app
