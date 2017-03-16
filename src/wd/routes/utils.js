import Endpoint from '../../endpoints'
import express from 'express'
import {wdio as wdioError} from '../../utils/errors.js'

let hooks = express.Router()
let pendingResponses = new Map()
const NEW_SESSION_REQUESTED = 'new-session-requested'

function errorHandler (err, req, res, next) {
  err = wdioError(err)
  console.error('WebDriver Error', err.message, err.stack)

  res
    .status(err.httpStatus || 500)
    .json({
      sessionId: req.sessionId,
      status: err.status,
      value: err
    })
}

hooks.get('/new-session/requested', function (req, res) {
  pendingResponses.set(NEW_SESSION_REQUESTED, res)
})

Endpoint.on('created', endpoint => {
  if (!pendingResponses.has(NEW_SESSION_REQUESTED)) {
    return
  }
  let res = pendingResponses.get(NEW_SESSION_REQUESTED)
  res.json(endpoint.dto())
})

export {
  hooks as hookMiddleware,
  errorHandler
}
