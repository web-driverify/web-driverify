import crypto from 'crypto'
import CommandQueue from './command-queue.js'
import Debug from 'debug'
import Endpoint from '../endpoints'

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
    if (this.initEndpoint.state === Endpoint.STATES.WAITING) {
      this.initEndpoint.resultArrived(null, this)
    }
  }
  remove () {
    return sessions.delete(this.id)
  }
  static get (id) {
    return sessions.get(id)
  }
  static populate (req) {
    let id = hash(req)
    let session = Session.get(id)
    if (session) {
      req.sessionId = id
      req.session = session
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
