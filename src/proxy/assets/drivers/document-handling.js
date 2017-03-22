import wd from '../utils/wd.js'
import Promise from 'es6-promise'

wd.handlers.ExecuteScript = function (script, args) {
  /*eslint evil: true */
  let fn = new Function(script)
  return fn.apply(window, args)
}

wd.handlers.ExecuteAsyncScript = function (script, args) {
  /*eslint evil: true */
  let fn = new Function(script)
  return new Promise(function (resolve, reject) {
    fn.apply(window, [...args, resolve])
  })
}
