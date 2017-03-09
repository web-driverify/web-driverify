import chai from 'chai';
import request from 'superagent';
import fixtures from '../fixtures';
import env from '../../src/utils/env';
import superagentProxy from 'superagent-proxy';
import superagentCarset from 'superagent-charset';
import Promise from 'bluebird';

superagentProxy(request);
superagentCarset(request);

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
    it('should proxy binary', function(done) {
        request.get(`${env.stubUrl}/binary`)
            .proxy(env.proxyUrl)
            .charset('gbk')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.contain('你好世界');
                done();
            });
    });
    it('should proxy html', function(done) {
        request.get(`${env.stubUrl}/emptyhtml`)
            .proxy(env.proxyUrl)
            .end((err, res) => {
                expect(res.text.slice(0, 30)).to.match(/^<html><script/);
                expect(res.text.slice(-40)).to.match(/<\/script><\/html>$/);
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
    it('should proxy headers', function(done) {
        request.get(`${env.stubUrl}/reflect`)
            .proxy(env.proxyUrl)
            .set('foo', 'bar')
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.equal('ok');
                expect(res.headers).to.have.property('foo', 'bar');
                done();
            });
    });
    it('should proxy POST', function(done) {
        request.post(`${env.stubUrl}/reflect`)
            .proxy(env.proxyUrl)
            .send('harttle')
            .set('content-type', 'text/plain')
            .set('foo', 'bar')
            .end((err, res) => {
                if (err) return done(err);
                expect(res.statusCode).to.equal(200);
                expect(res.text).to.equal('harttle');
                expect(res.headers).to.have.property('foo', 'bar');
                done();
            });
    });
    it('should proxy utf8 html', function(done) {
        request.get(`${env.stubUrl}/utf8`)
            .proxy(env.proxyUrl)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.contain('你好世界');
                done();
            });
    });
    it('should proxy gbk html', function(done) {
        request.get(`${env.stubUrl}/gbk`)
            .proxy(env.proxyUrl)
            .charset('gbk')
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.text).to.contain('你好世界');
                done();
            });
    });

    it('should proxy gzipped html', function(done) {
        request.get(`${env.stubUrl}/gzip`)
            .proxy(env.proxyUrl)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.contain('你好世界');
                done();
            });
    });
});
