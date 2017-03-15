import EventEmitter from 'events'
import _ from 'lodash'
import Debug from 'debug'
import random from 'lodash/random'
import {NotFound} from '../utils/errors.js'

let debug = Debug('Endpoint')
let registry = new Map()
let pool = new Map()
let emitter = new EventEmitter()

class Endpoint {
  constructor () {
    this.id = random(1000, 9999)
    this.status = 'waiting'
    this.args = _.slice(arguments)
    this.confirmationRequired = true
    pool.set(this.id, this)

    emitter.emit('created', this)
  }

  resultArrived (result, session) {
    if (this.status === 'exit') {
      console.warn(`result arrived after exit, discarding...`)
      return
    }
    result = this.transform(result, session)
    this.exit(0, result)
  }

  errorArrived (err) {
    this.response.status(500)
    this.exit(err.status, err.value)
  }

  exit (status, value) {
    this.status = 'exit'
    this.data = {
      sessionId: this.session.id,
      status: status || 0,
      value: value
    }
    this.response.json(this.data)
    pool.delete(this.id)
    emitter.emit('exit', this)
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

  static endpointById (req, res, next, id) {
    req.endpoint = Endpoint.get(id)
    if (req.endpoint) {
      next()
    } else {
      next(new NotFound(`endpoint ${id} not found`))
    }
  }

  static get (id) {
    debug(`finding endpoint by id ${id}...`)
    return pool.get(Number(id))
  }
}

Endpoint.registry = registry

export default Endpoint
