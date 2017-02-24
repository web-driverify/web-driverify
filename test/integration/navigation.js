import env from '../../src/utils/env.js';
import chai from 'chai';

let expect = chai.expect;

describe('navigation', function() {
    describe('GET /wd/hub/session/{session id}/url', function() {
        it('should get current url', function() {
            var url = `${env.stubUrl}/wellformed`;
            browser.url(url);
            expect(browser.getUrl()).to.equal(url);
        });
    });
});
