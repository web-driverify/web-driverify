import express from 'express'
import morgan from 'morgan'
import string from '../utils/string.js'
import Liquid from 'shopify-liquid'
import BodyParser from 'body-parser'
import config from '../utils/config.js'
import driverMiddleware from './routes/driver'
import externalMiddleware from './routes/external.js'
import utils from './routes/utils.js'
import path from 'path'
import Debug from 'debug'

let debug = Debug('wd:proxy')
let bodyParser = BodyParser.json({
  // doc: https://www.npmjs.com/package/body-parser
  limit: '50mb',
  strict: false
})
let engine = new Liquid({
  cache: config.name === 'production',
  root: path.resolve(__dirname, '../views/'),
  extname: '.html'
})
let app = express()

app.engine('html', engine.express())
app.set('views', path.resolve(__dirname, '../views'))
app.set('view engine', 'html')

app.post('/web-driverify/log/:level', bodyParser, utils.log)

app.use(morgan((tokens, req, res) => [
  tokens.method(req, res),
  string(tokens.url(req, res)).summary(),
  tokens.status(req, res) || '-',
  tokens['response-time'](req, res) || '-', 'ms'
].join(' ')))

app.use('/web-driverify/node_modules', express.static(
    path.resolve(__dirname, '../../node_modules')))
app.use('/web-driverify/assets', express.static(
    path.resolve(__dirname, './assets')))

app.use('/web-driverify', utils.pending, utils.emitter, bodyParser, driverMiddleware)
app.use(externalMiddleware)

app.use(function (err, req, res, next) {
  debug(err.message || 'unkown')
  debug(err.stack)
  res.status(err.httpStatus || 500).end(err.stack)
})

export default app
