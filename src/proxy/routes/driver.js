import express from 'express'
import NewSession from '../../endpoints/session/new-session.js'
import Session from '../../utils/session.js'
import Debug from 'debug'
import Endpoint from '../../endpoints'
import { injectWdScripts } from '../../utils/injector.js'
import {NotFound, Forbidden, UnknownCommand} from '../../utils/errors.js'

let router = express.Router()
let debug = Debug('wd:proxy:routes:driver')

router.param('eid', endpointById)

router.get('/', function (req, res) {
  res.set('content-type', 'text/html')
  let endpoint = NewSession.useToken(req.query.token)

  if (!endpoint) {
    console.warn('init session failed:', `endpoint not found for: ${req.query.token}`)
    res.status(404).render('connect-fail.html')
  } else {
    console.log(`initializing session with cmd ${req.query.cmd}...`)
    let session = new Session(req, endpoint)
    req.session = session

    res.render('connect-success.html', {
      ip: session.ip,
      ua: session.ua,
      id: session.id,
      wdScripts: injectWdScripts('')
    })
  }
})

router.get('/command', sessionRequired, function (req, res, next) {
  req.session.cmdQueue.front()
    .then(cmd => {
      debug(`cmd ${cmd} retrieved, sending...`)
      res.json(cmd.dto())
    })
    .catch(err => {
      req.session.cmdQueue.sendFailed(err)
      next(err)
    })
})

router.get('/session', sessionRequired, function (req, res) {
  debug('session requested', JSON.stringify(req.session.dto()))
  req.session.touch()
  res.json(req.session.dto())
})

router.post('/result/:eid', sessionRequired, function (req, res) {
  var cmd = req.session.cmdQueue.pop()
  debug(`result for ${cmd} arrived`)
  req.endpoint.resultArrived(req.body, req.session)
  res.status(200).end('received')
})

router.post('/error/:eid', sessionRequired, function (req, res) {
  var cmd = req.session.cmdQueue.pop()
  debug(`error for ${cmd} arrived`)
  req.endpoint.errorArrived(req.body, req.session)
  res.status(200).end('received')
})

router.use(function (req, res, next) {
  throw new NotFound(`not found: ${req.originalUrl}`)
})

function endpointById (req, res, next, id) {
  req.endpoint = Endpoint.get(id)
  if (!req.endpoint) {
    throw new UnknownCommand(`endpoint ${id} not found`)
  }
  next()
}

function sessionRequired (req, res, next) {
  Session.populate(req)
  if (!req.session) {
    throw new Forbidden('session not connected')
  }
  next()
}

export default router
