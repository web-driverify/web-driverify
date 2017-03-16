import express from 'express'
import session from './utils/session.js'
import Endpoint from './endpoints'
import './endpoints/export.js'

let rpc = {
  express: function () {
    let router = express.Router()
    router.param('sid', session.sessionById)
    router.use('/session/:sid', sessionRequired)

    Endpoint.registry.forEach(EndpointClass => {
      let {method, url, create} = EndpointClass
      router[method](url, (req, res, next) => {
        var endpoint = create(req)
        req.endpoint = endpoint
        next()
      })
    })

    router.use(unkownEndpoint)
    router.use(pushIntoSessionQueue)
    return router
  }
}

function pushIntoSessionQueue (req, res) {
  req.endpoint.session = req.session
  req.endpoint.response = res
  if (req.session) {
    req.session.cmdQueue.push(req.endpoint)
  }
}

function sessionRequired (req, res, next) {
  if (req.session) return next()
  res.json({
    sessionId: req.sessionId,
    status: 6,
    value: 'NoSuchDriver'
  })
}

function unkownEndpoint (req, res, next) {
  if (req.endpoint) return next()
  res.json({
    sessionId: req.session.id,
    status: 9,
    value: 'UnknownCommand'
  })
}

export default rpc
