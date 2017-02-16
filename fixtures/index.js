const Horseman = require('node-horseman');
const env = require('../utils/env.js');
const request = require('supertest');
const wd = require('../wd');
const proxy = require('../proxy');
const stub = require('../fixtures/server.js');
const debug = require('debug')('wd:fixtures');
const Command = require('../utils/command.js');

var proxyServer, browserClient, stubServer;

var fixtures = {};
fixtures.setupProxy = setupProxy;
fixtures.teardownProxy = teardownProxy;

fixtures.setupSession = setupSession;
fixtures.teardownSession = teardownSession;

fixtures.startStubServer = startStubServer;
fixtures.startProxyServer = startProxyServer;
fixtures.startBrowserClient = startBrowserClient;

function setupSession(done) {
    setupProxy(() => {
        wd.once('createSessionRequested', startBrowserClient);
        requestSession(() => done());
    });
}

function teardownSession(done) {
    teardownProxy(done);
    browserClient.close();
}

function setupProxy(done) {
    startStubServer(() => {
        startProxyServer(done);
    });
}

function teardownProxy(done) {
    proxyServer.close(() => stubServer.close(() => done()));
}

function startProxyServer(done) {
    proxyServer = proxy.listen(env.proxyPort, () => done());
}

function startStubServer(done) {
    stubServer = stub.listen(env.stubPort, () => done());
}

function startBrowserClient() {
    var cmdId = Command.getLastId();
    var initUrl = `${env.proxyUrl}/wd?cmd=${cmdId}`;
    debug('starting client:', initUrl, 'with proxy:', env.proxyUrl);
    browserClient = new Horseman()
        .setProxy(env.proxyUrl)
        .viewport(375, 667)
        .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
        .on('consoleMessage', msg => {
            debug('[browser console]', msg);
        })
        .on('error', (msg, trace) => {
            var msgStack = ['ERROR: ' + msg];
            if (trace && trace.length) {
                msgStack.push('TRACE:');
                trace.forEach(function(t) {
                    msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function+'")' : ''));
                });
            }
            debug('[browser error]', msgStack.join('\n'));
        })
        .then(() => {
            debug('browser started');
        })
        .open(initUrl)
        .waitForNextPage()
        .html()
        .then((text) => {
            debug('browser connected, html:', text);
        });
}

function requestSession(done) {
    request(wd).post(`/session`)
        .expect(200)
        .then(res => {
            var session = res.body;
            debug('session created', session.sessionId);
            fixtures.session = session;
            done();
        });
}

module.exports = fixtures;
