import { getWD } from '../utils/wd.js'

let wd = getWD()

wd.handlers.ExecuteScript = function (script, args) {
  /*eslint evil: true */
  let fn = new Function(script)
  return fn.apply(window, args)
}
