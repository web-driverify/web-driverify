import EventEmitter from 'events'
import Debug from 'debug'
import random from 'lodash/random'
import {parseError} from '../utils/protocol.js'

let debug = Debug('wd:Endpoint')
let registry = new Map()
let pool = new Map()
let emitter = new EventEmitter()
let STATES = {
  WAITING: 'waiting',
  EXIT: 'exit',
  ERROR: 'error'
}

class Endpoint {
  constructor (id = random(1000, 9999), args = []) {
    if (id instanceof Array) {
      args = id
      id = random(1000, 9999)
    }

    this.id = Number(id)
    this.args = args
    this.state = STATES.WAITING
    this.confirmationRequired = true

    pool.set(this.id, this)
    emitter.emit('created', this)
  }

  resultArrived (result, session) {
    if (this.state === STATES.EXIT) {
      console.warn(`result arrived after exit, discarding...`)
      return
    }
    result = this.transform(result, session)
    this.exit(0, result)
  }

  errorArrived (err) {
    err = parseError(err)
    if (err.httpStatus === 500) {
      console.error('error occurred:', err.message + '\n' + err.stack)
    }
    this.response.status(err.httpStatus)
    this.exit(err.status, err)
  }

  exit (status, value) {
    this.state = STATES.EXIT
    this.data = {
      sessionId: this.session.id,
      status: status || 0,
      value: value
    }
    this.response.json(this.data)
    pool.delete(this.id)
    emitter.emit('exited', this)
  }

  dto () {
    return {
      id: this.id,
      name: this.constructor.name,
      args: this.args
    }
  }

  transform (data) {
    return data
  }
  toString () {
    return `${this.constructor.name}(${this.id})${JSON.stringify(this.args)}`
  }
  static on (name, cb) {
    return emitter.on(name, cb)
  }
  static once (name, cb) {
    return emitter.once(name, cb)
  }

  static register (EndpointImpl) {
    if (registry.has(EndpointImpl.name)) {
      throw new Error(`command ${EndpointImpl.name} already registered`)
    }
    registry.set(EndpointImpl.name, EndpointImpl)
    return EndpointImpl
  }

  static get (id) {
    debug(`finding endpoint by id ${id}...`)
    return pool.get(Number(id))
  }
}

Endpoint.registry = registry
Endpoint.STATES = STATES

export default Endpoint
