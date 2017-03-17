import wd from '../utils/wd.js'

wd.handlers.ExecuteScript = function (script, args) {
  /*eslint evil: true */
  let fn = new Function(script)
  return fn.apply(window, args)
}
