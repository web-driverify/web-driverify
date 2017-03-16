import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import driver from './routes/driver.js'
import {errorHandler, hookMiddleware} from './routes/utils.js'

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
app.use('/wd/hub/', driver.express())
app.use('/hooks', hookMiddleware)

app.use(errorHandler)

export default app
