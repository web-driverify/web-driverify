import { getWD } from '../utils/wd.js';
import { ClickEvent } from '../utils/events.js';
import { StaleElementReference, ElementNotVisible } from '../utils/errors.js';

let wd = getWD();

wd.handlers.ElementClick = function(id) {
    var el = wd.elements[id];
    if (!el) {
        throw new StaleElementReference();
    }
    if (isHidden(el)) {
        return new ElementNotVisible();
    }
    el.dispatchEvent(new ClickEvent());
    return 'element ' + id + ' clicked';
};

function isHidden(el) {
    var style = window.getComputedStyle(el);
    return (style.display === 'none');
}
