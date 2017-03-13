import { getWD } from '../utils/wd.js'
import html2canvas from '../utils/html2canvas.js'

let wd = getWD()

wd.handlers.Screenshot = function () {
  return html2canvas(document.body)
        .then(function (canvas) {
          let str = canvas.toDataURL('image/png')
          str = str.replace(/^data:[^;]*;base64,/, '')
          return str
        })
}
