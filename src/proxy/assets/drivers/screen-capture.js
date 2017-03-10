import { getWD } from '../utils/wd.js'
import Promise from 'es6-promise'

let wd = getWD()

wd.handlers.Screenshot = function () {
  return window.html2canvas(document.body)
        .then(function (canvas) {
          let str = canvas.toDataURL('image/png')
          str = str.replace(/^data:[^;]*;base64,/, '')
          return str
        })
}
