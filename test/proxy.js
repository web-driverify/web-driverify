const chai = require('chai');
const expect = chai.expect;
const proxy = require('../proxy');
const server = require('../fixtures/server.js');
const request = require('superagent');
const env = require('../utils/env.js');
require('superagent-proxy')(request);

describe('proxy', function() {
    var serverSocket, proxySocket;
    var proxyUrl = `http://localhost:${env.browserPort}`;
    var serverUrl = `http://localhost:${env.testServerPort}`;

    before(done => {
        serverSocket = server.listen(env.testServerPort, () => {
            proxySocket = proxy.listen(env.browserPort, () => done());
        });
    });
    after(done => proxySocket.close(() => serverSocket.close(() => done())));

    it('should proxy stylesheets', function(done) {
        request.get(`${serverUrl}/css`)
            .proxy(proxyUrl)
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
        request.get(`${serverUrl}/emptyhtml`)
            .proxy(proxyUrl)
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
        request.get(`${serverUrl}/empty`)
            .proxy(proxyUrl)
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
        request.get(`${serverUrl}/wellformed`)
            .proxy(proxyUrl)
            .end((err, res) => {
                expect(res.text).to.equal(html);
                done();
            });
    });
    it('should provide init page', function(done) {
        request.get(`${proxyUrl}/wd`)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.match(/.+/);
                expect(res.headers['content-type']).to.match(/text\/html/);
                done();
            });
    });
});
