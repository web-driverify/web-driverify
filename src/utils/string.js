function string (str) {
  if (str === undefined) str = null
  else if (typeof str === 'object') str = JSON.stringify(str)
  else str = String(str)

  return {
    summary: function (len) {
      len = len || 64
      let result = str.substr(0, len)
      if (str.length > len) {
        result += '... (' + (str.length - len) + ' more bytes)'
      }
      return result
    },
    toString: () => str
  }
}

string.fromError = function (err) {
  var name = err.name || 'unkown error'
  var stack = err.stack || 'no stack available'
  return string(`${name}: ${err.message}\n${stack}`)
}
export default string
