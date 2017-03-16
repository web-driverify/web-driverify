import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import rpc from '../rpc.js'
import {wdio as wdioError} from '../utils/errors.js'

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
app.use('/wd/hub/', rpc.express())

app.use(function (err, req, res, next) {
  err = wdioError(err)
  console.error('WebDriver Error', err.message, err.stack)

  res
    .status(err.httpStatus || 500)
    .json({
      sessionId: req.sessionId,
      status: err.status,
      value: err
    })
})

export default app
