const chai = require('chai');
const expect = chai.expect;
const request = require('superagent');
const fixtures = require('../fixtures');
const env = require('../utils/env');
require('superagent-proxy')(request);

describe('proxy', function() {
    before(fixtures.setupProxy);
    after(fixtures.teardownProxy);

    it('should proxy stylesheets', function(done) {
        request.get(`${env.stubUrl}/css`)
            .proxy(env.proxyUrl)
            .end((err, res) => {
                expect(res.text).to.equal('div{color: red}');
                done();
            });
    });
    it('should proxy emptyhtml', function(done) {
        var html = [
            '<html>',
            "<script src='/wd/assets/vendors/jquery/dist/jquery.min.js'></script>",
            "<script src='/wd/assets/javascripts/index.js'></script>",
            '</html>'
        ].join('\n');
        request.get(`${env.stubUrl}/emptyhtml`)
            .proxy(env.proxyUrl)
            .end((err, res) => {
                expect(res.text).to.equal(html);
                done();
            });
    });
    it('should proxy empty', function(done) {
        var html = [
            "",
            "<script src='/wd/assets/vendors/jquery/dist/jquery.min.js'></script>",
            "<script src='/wd/assets/javascripts/index.js'></script>",
            ""
        ].join('\n');
        request.get(`${env.stubUrl}/empty`)
            .proxy(env.proxyUrl)
            .end((err, res) => {
                expect(res.text).to.equal(html);
                done();
            });
    });
    it('should proxy wellformed html', function(done) {
        var html = [
            "<html><head>",
            "<script src='/wd/assets/vendors/jquery/dist/jquery.min.js'></script>",
            "<script src='/wd/assets/javascripts/index.js'></script>",
            "</head><body>foo</body></html>"
        ].join('\n');
        request.get(`${env.stubUrl}/wellformed`)
            .proxy(env.proxyUrl)
            .end((err, res) => {
                expect(res.text).to.equal(html);
                done();
            });
    });
    it('should provide init page', function(done) {
        request.get(`${env.stubUrl}/wd`)
            .proxy(env.proxyUrl)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.match(/.+/);
                expect(res.headers['content-type']).to.match(/text\/html/);
                done();
            });
    });
});
