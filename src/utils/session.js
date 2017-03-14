import crypto from 'crypto'
import CommandQueue from './command-queue.js'
import Debug from 'debug'

let debug = Debug('wd:utils:session')
let sessions = new Map()

class Session {
  constructor (req, initEndpoint) {
    this.id = hash(req)
    this.ip = req.ip
    this.ua = req.headers['user-agent']
    this.cmdQueue = new CommandQueue()
    this.storage = {}
    this.initEndpoint = initEndpoint
    this.initEndpoint.session = this
    sessions.set(this.id, this)
    debug(`session created: ${this}`)
  }
  toString () {
    return `${this.id}:${this.ip}:${this.ua}`
  }
  dto () {
    return this.storage
  }
  touch () {
    if (this.initEndpoint.status === 'waiting') {
      this.initEndpoint.resultArrived(null, this)
    }
  }
  remove () {
    return sessions.delete(this.id)
  }
  static sessionById (req, res, next, id) {
    req.sessionId = id
    req.session = sessions.get(id)
    next()
  }
  static sessionByReq (req, res, next) {
    var id = hash(req)
    req.session = sessions.get(id)
    next()
  }
  static required (req, res, next) {
    if (!req.session) {
      var e = new Error('session not connected')
      e.status = 403
      next(e)
    } else {
      next()
    }
  }
}

function hash (req) {
  var sum = crypto.createHash('md5')
  sum.update(req.ip)
  sum.update(req.headers['user-agent'] || 'anonymous')
  return sum.digest('hex')
}

export default Session
