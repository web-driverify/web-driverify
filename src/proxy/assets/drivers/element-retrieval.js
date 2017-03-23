import wd from '../utils/wd.js'
import { NoSuchElement, XPathLookupError } from '../../../utils/errors.js'
import some from 'lodash/some'
import map from 'lodash/map'
import filter from 'lodash/filter'
import element from '../utils/element.js'

wd.handlers.FindElement = findElement
wd.handlers.FindElements = findElements

wd.handlers.FindElementFromElement = findElement
wd.handlers.FindElementsFromElement = findElements

function findElement (using, value, id) {
  let root = (typeof id === 'undefined') ? document : element.getById(id)
  let strategy = singleElementStrategies[using]
  let el = strategy(value, root)
  if (!el) {
    throw new NoSuchElement()
  }
  return createWebElement(el)
}

function findElements (using, value, id) {
  let root = (typeof id === 'undefined') ? document : element.getById(id)
  let strategy = elementStrategies[using]
  let els = strategy(value, root)
  return map(els, el => createWebElement(el))
}

var singleElementStrategies = {
  'class name': function (val, root = document) {
    return root.getElementsByClassName(val)[0]
  },
  'css selector': function (val, root = document) {
    return root.querySelector(val)
  },
  'id': function (val, root = document) {
    return root.getElementById(val)
  },
  'name': function (val, root = document) {
    return root.getElementsByName(val)[0]
  },
  'link text': function (val, root = document) {
    var els = root.querySelectorAll('a')
    for (var i = 0; i < els.length; i++) {
      var el = els[i]
      if (el.innerText === val) {
        return el
      }
    }
    return null
  },
  'partial link text': function (val, root = document) {
    let ret = null
    some(root.querySelectorAll('a'), el => {
      if (el.innerText.indexOf(val) > -1) {
        ret = el
        return true
      }
    })
    return ret
  },
  'tag name': function (val, root = document) {
    return root.getElementsByTagName(val)[0]
  },
  'xpath': function (val, root = document) {
    try {
      return root.evaluate(val, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    } catch (err) {
      throw new XPathLookupError()
    }
  }
}

var elementStrategies = {
  'class name': function (val, root = document) {
    return root.getElementsByClassName(val)
  },
  'css selector': function (val, root = document) {
    return root.querySelectorAll(val)
  },
  'id': function (val, root = document) {
    return [root.getElementById(val)]
  },
  'name': function (val, root = document) {
    return root.getElementsByName(val)
  },
  'link text': function (val, root = document) {
    return filter(root.querySelectorAll('a'), el => el.innerText === val)
  },
  'partial link text': function (val, root = document) {
    return filter(root.querySelectorAll('a'), el => el.innerText.indexOf(val) > -1)
  },
  'tag name': function (val, root = document) {
    return root.getElementsByTagName(val)
  },
  'xpath': function (val, root = document) {
    try {
      let it = root.evaluate(val, root, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
      let ret = []
      let node = it.iterateNext()
      while (node) {
        ret.push(node)
        node = it.iterateNext()
      }
      return ret
    } catch (err) {
      throw new XPathLookupError()
    }
  }
}

function createWebElement (el) {
  let id = element.getOrCreate(el)
  return {
    ELEMENT: id
  }
}
