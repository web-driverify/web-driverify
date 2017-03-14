import EventEmitter from 'events'
import session from '../utils/session.js'
import express from 'express'
import _ from 'lodash'
import Debug from 'debug'
import random from 'lodash/random'

let debug = Debug('Endpoint')
let registry = new Map()
let router = express.Router()
let pool = new Map()
let emitter = new EventEmitter()

router.param('sid', session.sessionById)

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

  /*
   * return and exit a endpoint
   */
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

  /*
   * Data transfer object for rpc
   */
  dto () {
    return {
      id: this.id,
      name: this.constructor.name,
      args: this.args
    }
  }

  /*
   * post transform of browser returned data
   */
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

  /*
   * Register a Endpoint Implementation
   */
  static register (EndpointImpl) {
    if (registry.has(EndpointImpl.name)) {
      throw new Error(`command ${EndpointImpl.name} already registered`)
    }
    registry.set(EndpointImpl.name, EndpointImpl)
    EndpointImpl.express(router)
    return EndpointImpl
  }

  /*
   * Express middleware for WebDriver HTTP API
   */
  static express () {
    router.use('/session/:sid', sessionRequired)
    router.use(unkownEndpoint)
    router.use(pushIntoSessionQueue)
    return router
  }

  /*
   * Endpoint population middleware
   */
  static endpointById (req, res, next, id) {
    req.endpoint = Endpoint.get(id)
    if (req.endpoint) {
      next()
    } else {
      var err = new Error(`endpoint ${id} not found`)
      err.status = 404
      next(err)
    }
  }

  static get (id) {
    debug(`finding endpoint in ${pool.keys()} by id ${id}...`)
    id = Number(id)
    return pool.get(id)
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

export default Endpoint
