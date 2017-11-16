import wd from '../utils/wd.js'
import Promise from 'es6-promise'
import element from '../utils/element'
import { forEach } from 'lodash'

wd.handlers.ExecuteScript = function (script, args) {
  // eslint-disable-next-line no-new-func
  let fn = new Function(script)
  args = convertArgs(args)
  let res = convertResults(fn.apply(window, args))
  return res
}

wd.handlers.ExecuteAsyncScript = function (script, args) {
  // eslint-disable-next-line no-new-func
  let fn = new Function(script)
  args = convertArgs(args)
  return new Promise(function (resolve, reject) {
    fn.apply(window, [...args, handleResults(resolve)])
  })
}

wd.handlers.Source = function () {
  return document.documentElement.outerHTML
}

function tryParseWebElement (json) {
  if (json.value && json.value.hasOwnProperty('ELEMENT')) {
    return element.getById(json.value.ELEMENT)
  }
  return json
}

function tryConvertWebElement (el) {
  if (el instanceof Element) {
    return {ELEMENT: element.getOrCreate(el)}
  }
  return el
}

function convertArgs (args) {
  return args.map((value) => tryParseWebElement(value))
}

function convertResults (result) {
  if (result instanceof Element) {
    return tryConvertWebElement(result)
  } else if (result instanceof Array) {
    return result.map((value) => tryConvertWebElement(value))
  } else if ((typeof result) === 'object') {
    forEach(result, function (value, key) {
      result[key] = tryConvertWebElement(value)
    })
    return result
  } else {
    return result
  }
}

function handleResults (resolve) {
  return function (result) {
    resolve(convertResults(result))
  }
}
