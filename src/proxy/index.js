import express from 'express'
import morgan from 'morgan'
import string from '../utils/string.js'
import Liquid from 'shopify-liquid'
import env from '../utils/env.js'
import driverMiddleware from './routes/driver'
import externalMiddleware from './routes/external.js'
import utils from './routes/utils.js'
import session from '../utils/session.js'
import path from 'path'

let engine = new Liquid({
  cache: env.name === 'production',
  root: path.resolve(__dirname, '../views/'),
  extname: '.html'
})
let app = express()

app.engine('html', engine.express())
app.set('views', path.resolve(__dirname, '../views'))
app.set('view engine', 'html')

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

app.use('/web-driverify', utils.pending, session.sessionByReq, utils.emitter, driverMiddleware)
app.use(externalMiddleware)

export default app
