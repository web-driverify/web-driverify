const Horseman = require('node-horseman');
const env = require('../utils/env.js');
const request = require('supertest');
const wd = require('../wd');
const proxy = require('../proxy');
const debug = require('debug')('wd:fixtures:env');
const Command = require('../utils/command.js');

var proxyServer, browserClient;

function setup(done) {
    startProxy(function() {
        requestSession(done);
        setTimeout(() => {
            startClient();
        }, 1000);
    });
}

function teardown(done) {
    browserClient.close();
    proxyServer.close(() => done());
}

function startProxy(done) {
    proxyServer = proxy.listen(env.browserPort, () => done());
}

function startClient() {
    var cmdId = Command.getLastId();
    var url = `http://localhost:${env.browserPort}/wd?cmd=${cmdId}`;
    debug('starting client', url);
    browserClient = new Horseman()
        .setProxy('localhost', env.browserPort, 'http')
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
        .open(url)
        .waitForNextPage()
        .html()
        .then((text) => {
            debug('browser connected, html length:', text.length);
        });
}

function requestSession(done) {
    request(wd).post(`/session`)
        .expect(200)
        .then(res => {
            var session = res.body;
            debug('session created', session.sessionId);
            done(session);
        });
}

exports.setup = setup;
exports.teardown = teardown;
