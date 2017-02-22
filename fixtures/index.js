import Horseman from 'node-horseman';
import env from '../utils/env.js';
import request from 'supertest';
import wd from '../wd';
import proxy from '../proxy';
import stub from '../fixtures/server.js';
import Debug from 'debug';
import Endpoint from '../endpoints';
import Promise from 'bluebird';

let proxyServer, browserClient, stubServer;
let debug = Debug('wd:fixtures');
let fixtures = {
    setupProxy,
    teardownProxy,
    setupSession,
    teardownSession,
    startStubServer,
    startProxyServer,
    startBrowserClient,
    exitBrowserClient
};

function setupSession() {
    debug('setting up session...');
    return setupProxy()
        .then(() => new Promise((resolve, reject) => {
            Endpoint.once('created', endpoint => {
                debug('endpoint created', endpoint);
                return startBrowserClient(endpoint.id)
                    .then(results => resolve(results))
                    .catch(err => reject(err));
            });
            requestSession();
        }));
}

function teardownSession() {
    debug('tearing down session...');
    return Promise.all([teardownProxy(), browserClient.close()]);
}

function setupProxy() {
    debug('setting up proxy...');
    return startStubServer()
        .then(() => startProxyServer());
}

function teardownProxy() {
    debug('tearing down proxy...');
    return Promise.fromCallback(cb => proxyServer.close(cb))
        .then(() => {
            debug('proxy server closed, closing stub server...');
            return stubServer.close();
        });
}

function startProxyServer() {
    debug('starting proxy server...');
    return new Promise((resolve, reject) => {
        proxyServer = proxy.listen(env.proxyPort, (err, results) => {
            err ? reject(err) : resolve(results);
        });
    });
}

function startStubServer() {
    debug('starting stub server...');
    return new Promise((resolve, reject) => {
        stubServer = stub.listen(env.stubPort, (err, results) => {
            err ? reject(err) : resolve(results);
        });
    });
}

function startBrowserClient(cmdId) {
    var initUrl = `${env.proxyUrl}/wd?cmd=${cmdId}`;
    debug('starting browser client:', initUrl, 'with proxy:', env.proxyUrl);
    return new Promise((resolve) => {
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
                debug('browser connected, html length:', text.length);
                resolve();
            });
    });
}

function exitBrowserClient() {
    return Promise.resolve().then(() => browserClient.close());
}

function requestSession() {
    debug('requesting session');
    return request(wd).post(`/wd/hub/session`)
        .expect(200)
        .then(res => {
            var session = res.body;
            debug('session created', session.sessionId);
            fixtures.session = session;
        });
}

export default fixtures;
