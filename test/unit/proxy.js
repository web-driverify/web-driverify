import chai from 'chai';
import request from 'superagent';
import fixtures from '../fixtures';
import env from '../../src/utils/env';
import superagentProxy from 'superagent-proxy';
import Promise from 'bluebird';

superagentProxy(request);

let expect = chai.expect;

describe('proxy', function() {
    before(() => Promise.all([
        fixtures.setupProxy(),
        fixtures.setupStub()
    ]));
    after(() => Promise.all([
        fixtures.teardownProxy(),
        fixtures.teardownStub()
    ]));

    it('should proxy stylesheets', function(done) {
        request.get(`${env.stubUrl}/css`)
            .proxy(env.proxyUrl)
            .end((err, res) => {
                expect(res.text).to.equal('div{color: red}');
                done();
            });
    });
    it('should proxy emptyhtml', function(done) {
        request.get(`${env.stubUrl}/emptyhtml`)
            .proxy(env.proxyUrl)
            .end((err, res) => {
                expect(res.text.slice(0, 30)).to.match(/^<html><script/);
                expect(res.text.slice(-40)).to.match(/<\/script><\/html>$/);
                done();
            });
    });
    it('should proxy empty', function(done) {
        request.get(`${env.stubUrl}/empty`)
            .proxy(env.proxyUrl)
            .end((err, res) => {
                expect(res.text.slice(0, 30)).to.match(/^<script/);
                expect(res.text.slice(-40)).to.match(/<\/script>$/);
                done();
            });
    });
    it('should proxy wellformed html', function(done) {
        request.get(`${env.stubUrl}/wellformed`)
            .proxy(env.proxyUrl)
            .end((err, res) => {
                expect(res.text.slice(0, 30)).to.match(/^<html><head><script/);
                expect(res.text.slice(-40)).to.match(/<\/script><\/head><body>foo<\/body><\/html>$/);
                done();
            });
    });
    it('should provide init page', function(done) {
        request.get(`${env.stubUrl}/web-driverify`)
            .proxy(env.proxyUrl)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                expect(res.text).to.match(/.+/);
                expect(res.headers['content-type']).to.match(/text\/html/);
                done();
            });
    });
});
