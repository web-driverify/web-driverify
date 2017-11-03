import { slice } from 'lodash'
import $ from 'jquery'

const pageId = Math.random().toString(36).substr(2, 4)

class Log {
  constructor (id) {
    this.id = id || 'anonymous'
  }
  log () {
    this.doLog('log', arguments)
  }
  error () {
    this.doLog('error', arguments)
  }
  doLog (level, args) {
    args = slice(args)
    args.unshift(`[${this.id}]`)
    args.unshift(`[page-id:${pageId}]`)

    console[level].apply(console, args)
    $.ajax({
      type: 'POST',
      url: `/web-driverify/log/${level}`,
      dataType: 'json',
      async: false,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(args)
    })
  }
}
export default Log
