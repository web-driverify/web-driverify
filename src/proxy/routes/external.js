import request from 'request';
import zlib from 'zlib';
import Promise from 'bluebird';
import charset from 'charset';
import _ from 'lodash';
import Debug from 'debug';
import { injectWdScripts } from '../../utils/injector.js';
import string from '../../utils/string.js';
import iconv from 'iconv-lite';

let debug = Debug('wd:proxy:routes:external');

function proxy(req, res) {
    let options = {
        url: req.originalUrl,
        followRedirect: false,
        jar: true,
        encoding: null
    };
    let response = null;
    let headers = null;

    return Promise.fromCallback(cb => req.pipe(request(options, cb)))
        .tap(function initVariables(res) {
            debug('retrieved', res.statusCode, string(req.originalUrl).summary());
            response = res;
            headers = _.clone(res.headers);
            return res;
        })
        .then(function detectHTML(response) {
            let body = response.body || '';
            if (!isHTML(response.headers)) {
                return body;
            } else {
                debug('html content detected, length:', body.length);
                delete headers['content-encoding'];
                return injectHTML(response);
            }
        })
        .then(function send(buffer) {
            headers['content-length'] = Buffer.byteLength(buffer);
            _.map(headers, (v, k) => res.set(normalize(k), normalize(v)));
            res.status(response.statusCode);
            res.end(buffer, 'binary');
        })
        .catch(function error(err) {
            let msg = 'proxy error:' + err.message;
            console.error(msg, err.stack);
            return res.status(500).end(msg);
        });
}

function injectHTML(response) {
    let cs = null;
    return Promise.resolve(response.body)
        .then(function deflate(body) {
            if (/gzip/.exec(response.headers['content-encoding'])) {
                return Promise.fromCallback(cb => zlib.gunzip(body, cb));
            }
            return body;
        })
        //.tap(buffer => debug('deflated buffer:', buffer))
        .then(function detectCharset(buffer) {
            cs = charset(response.headers, buffer) || 'utf8';
            debug('html encoding detected as', cs);
            return buffer;
        })
        .then(buffer => iconv.decode(buffer, cs))
        //.tap(html => debug('decoded html:', string(html).summary(64)))
        .then(html => injectWdScripts(html))
        .tap(html => debug('injected html:', string(JSON.stringify(html)).summary(64)))
        .then(html => iconv.encode(html, cs));
}

function isHTML(headers) {
    return headers && headers['content-type'] && headers['content-type'].match('text/html');
}

function normalize(str) {
    return String(str || '').trim();
}

export default proxy;
