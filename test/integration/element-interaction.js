/* globals browser: true */

import env from '../../src/utils/env.js';
import chai from 'chai';

let expect = chai.expect;

describe('element interaction', function() {

    var plain = `${env.stubUrl}/plain-html`;
    var id;

    before(function() {
        browser.url(plain);
        id = browser.element('.control-label').value.ELEMENT;
    });

    it('GET /session/{session id}/element/{element id}', function() {
        var text = browser.elementIdText(id);
        expect(text.value).to.equal('Homepage');
        browser.elementIdClick(id);
    });
});
