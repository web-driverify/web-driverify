import { getWD } from '../utils/wd.js'

let wd = getWD()

wd.handlers.GetElementText = function (id) {
  var el = wd.elements[id]
  if (!el) {
    var err = new Error('StaleElementReference')
    err.status = 10
    throw err
  } else {
    var text = el.innerText
    console.log('GetElementText sending:', text)
    return text
  }
}
