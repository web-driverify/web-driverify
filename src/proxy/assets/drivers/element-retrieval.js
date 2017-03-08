import { getWD } from '../utils/wd.js';
import { NoSuchElement, XPathLookupError } from '../utils/errors.js';

let wd = getWD();
let elementId = 0;

wd.handlers.FindElement = function(query) {
    var strategy = singleElementStrategies[query.using];
    var el = strategy(query.value);
    if (!el) {
        throw new NoSuchElement();
    }
    return webElement(el);
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
        let el = null;
        try {
            el = document.evaluate(val, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        } catch (err) {
            throw new XPathLookupError();
        }
    }
};

function webElement(el) {
    wd.elements[elementId] = el;
    return {
        ELEMENT: elementId++
    };
}
