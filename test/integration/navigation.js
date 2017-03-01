/* globals browser: true */

import env from '../../src/utils/env.js';
import chai from 'chai';

let expect = chai.expect;

describe('navigation', function() {

    var url1 = `${env.stubUrl}/wellformed`;
    var url2 = `${env.stubUrl}/emptyhtml`;

    describe('GET /wd/hub/session/{session id}/url', function() {
        it('should support GetCurrentUrl', function() {
            browser.url(url1);
            expect(browser.getUrl()).to.equal(url1);
        });
        it('should support Go', function() {
            browser.url(url1);
            browser.url(url2);
            expect(browser.getUrl()).to.equal(url2);
        });
        it('should support Back', function() {
            browser.url(url1);
            browser.url(url2);
            browser.back();
            expect(browser.getUrl()).to.equal(url1);
        });
        it('should support Forward', function() {
            browser.url(url1);
            browser.url(url2);
            browser.back();
            browser.forward();
            expect(browser.getUrl()).to.equal(url2);
        });
    });
});
