import Debug from 'debug'
import string from '../../utils/string.js'
import _ from 'lodash'

let debug = Debug('wd:proxy:routes:utils')

function pending (req, res, next) {
  debug(req.method.toUpperCase(), string(req.originalUrl).summary(), 'pending...')
  next()
}

function emitter (req, res, next) {
  req.app.emit('requested', req)
  next()
}

function log (req, res, next) {
  let args = _.slice(req.body)
  let level = '[remote:' + req.params.level + ']'
  args.unshift(level)
  debug.apply(null, args)
  res.status(204).end()
}

export default { emitter, pending, log }
