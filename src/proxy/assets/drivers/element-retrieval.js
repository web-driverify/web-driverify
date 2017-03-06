import { getWD } from '../utils/wd.js';

let wd = getWD();
let elementId = 0;

wd.handlers.FindElement = function(query) {
    var strategy = singleElementStrategies[query.using];
    try {
        var el = strategy(query.value);
        if (!el) {
            var err = new Error('NoSuchElement');
            err.status = 7;
            throw err;
        }
        return webElement(el);
    } catch (e) {
        if (e.code === 12 && e.message.indexOf('XPath') > -1) {
            e.status = 19;
        }
        throw e;
    }
};

var singleElementStrategies = {
    'class name': function(val) {
        return document.getElementsByClassName(val)[0];
    },
    'css selector': function(val) {
        return document.querySelector(val);
    },
    'id': function(val) {
        return document.getElementById(val);
    },
    'name': function(val) {
        return document.getElementsByName(val);
    },
    'link text': function(val) {
        var els = document.querySelectorAll('a');
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (el.innerText === val) {
                return el;
            }
        }
        return null;
    },
    'partial link text': function(val) {
        var els = document.querySelectorAll('a');
        for (var i = 0; i < els.length; i++) {
            var el = els[i];
            if (el.innerText.indexOf(val) > -1) {
                return el;
            }
        }
        return null;
    },
    'tag name': function(val) {
        return document.getElementsByTagName(val);
    },
    'xpath': function(val) {
        return document.evaluate(val, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
};

function webElement(el) {
    wd.elements[elementId] = el;
    return {
        ELEMENT: elementId++
    };
}
