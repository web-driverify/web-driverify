import http from 'http'

class NotFound extends Error {
  constructor (msg) {
    super()
    this.message = msg || http.STATUS_CODES[404]
    this.status = 404
  }
}

export {NotFound}
