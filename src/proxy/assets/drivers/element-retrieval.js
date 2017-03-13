import { getWD } from '../utils/wd.js'
import { NoSuchElement, XPathLookupError } from '../utils/errors.js'
import some from 'lodash/some'
import map from 'lodash/map'
import filter from 'lodash/filter'
import element from '../utils/element.js'

let wd = getWD()

wd.handlers.FindElement = function (query) {
  let strategy = singleElementStrategies[query.using]
  let el = strategy(query.value)
  if (!el) {
    throw new NoSuchElement()
  }
  return createWebElement(el)
}

wd.handlers.FindElements = function (query) {
  let strategy = elementStrategies[query.using]
  let els = strategy(query.value)
  return map(els, el => createWebElement(el))
}

var singleElementStrategies = {
  'class name': function (val) {
    return document.getElementsByClassName(val)[0]
  },
  'css selector': function (val) {
    return document.querySelector(val)
  },
  'id': function (val) {
    return document.getElementById(val)
  },
  'name': function (val) {
    return document.getElementsByName(val)[0]
  },
  'link text': function (val) {
    var els = document.querySelectorAll('a')
    for (var i = 0; i < els.length; i++) {
      var el = els[i]
      if (el.innerText === val) {
        return el
      }
    }
    return null
  },
  'partial link text': function (val) {
    let ret = null
    some(document.querySelectorAll('a'), el => {
      if (el.innerText.indexOf(val) > -1) {
        ret = el
        return true
      }
    })
    return ret
  },
  'tag name': function (val) {
    return document.getElementsByTagName(val)[0]
  },
  'xpath': function (val) {
    try {
      return document.evaluate(val, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    } catch (err) {
      throw new XPathLookupError()
    }
  }
}

var elementStrategies = {
  'class name': function (val) {
    return document.getElementsByClassName(val)
  },
  'css selector': function (val) {
    return document.querySelectorAll(val)
  },
  'id': function (val) {
    return [document.getElementById(val)]
  },
  'name': function (val) {
    return document.getElementsByName(val)
  },
  'link text': function (val) {
    return filter(document.querySelectorAll('a'), el => el.innerText === val)
  },
  'partial link text': function (val) {
    return filter(document.querySelectorAll('a'), el => el.innerText.indexOf(val) > -1)
  },
  'tag name': function (val) {
    return document.getElementsByTagName(val)
  },
  'xpath': function (val) {
    try {
      let it = document.evaluate(val, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null)
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
  let id = element.create(el)
  return {
    ELEMENT: id
  }
}
