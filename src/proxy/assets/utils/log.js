import slice from 'lodash/slice'
import $ from 'jquery'
import wd from '../utils/wd.js'

let pageId = wd.pageId

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
