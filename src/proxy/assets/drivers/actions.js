import wd from '../utils/wd.js'
import Pointer from '../utils/pointer.js'
import element from '../utils/element.js'

wd.handlers.TouchClick = function (id) {
  let pos = wd.handlers.GetElementRect(id)
  let x = pos.x + pos.width / 2
  let y = pos.y + pos.height / 2
  let p = new Pointer(x, y)
  p.tap()
  return element.toString(id) + ` tapped at ${x}, ${y}`
}
