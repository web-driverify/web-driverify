import express from 'express'
import Session from '../../utils/session.js'
import Endpoint from '../../endpoints'
import {NoSuchDriver, UnknownCommand} from '../../utils/errors.js'
import '../../endpoints/export.js'

let rpc = {
  express: function () {
    let router = express.Router()
    router.use('/session/:sid', sessionRequired)

    Endpoint.registry.forEach(EndpointClass => {
      let {method, url, create} = EndpointClass

      router[method](url, (req, res, next) => {
        req.endpoint = create(req)
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
  let id = req.params.sid
  let session = Session.get(id)

  if (!session) {
    throw new NoSuchDriver('session not established')
  }
  req.sessionId = id
  req.session = session
  next()
}

function unkownEndpoint (req, res, next) {
  if (req.endpoint) return next()
  throw new UnknownCommand('endpoint not found')
}

export default rpc
