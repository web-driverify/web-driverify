import express from 'express'
import {parseError} from '../../utils/protocol.js'

let hooks = express.Router()

function errorHandler (err, req, res, next) {
  err = parseError(err)
  console.error('WebDriver Error', err.message, err.stack)

  res
    .status(err.httpStatus || 500)
    .json({
      sessionId: req.sessionId,
      status: err.status,
      value: err
    })
}

export {
  hooks as hookMiddleware,
  errorHandler
}
