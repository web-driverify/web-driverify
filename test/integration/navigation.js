/* globals browser: true */

import env from '../../src/utils/env.js';
import chai from 'chai';

let expect = chai.expect;

describe('navigation', function() {

    var url1 = `${env.stubUrl}/wellformed`;
    var url2 = `${env.stubUrl}/emptyhtml`;

    it('GET /session/{session id}/url', function() {
        browser.url(url1);
        expect(browser.getUrl()).to.equal(url1);
    });
    it('POST /session/{session id}/url', function() {
        browser.url(url1);
        browser.url(url2);
        expect(browser.getUrl()).to.equal(url2);
    });
    it('POST /session/{session id}/refresh', function() {
        browser.url(url1);
        browser.refresh();
        expect(browser.getUrl()).to.equal(url1);
    });
    it('POST /session/{session id}/back', function() {
        browser.url(url1);
        browser.url(url2);
        browser.back();
        expect(browser.getUrl()).to.equal(url1);
    });
    it('POST /session/{session id}/forward', function() {
        browser.url(url1);
        browser.url(url2);
        browser.back();
        browser.forward();
        expect(browser.getUrl()).to.equal(url2);
    });
});
