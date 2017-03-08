import request from 'request';
import charset from 'charset';
import _ from 'lodash';
import Debug from 'debug';
import injector from '../utils/injector.js';
import string from '../../utils/string.js';

let debug = Debug('wd:proxy:routes:external');

function proxy(req, res) {
    var url = req.originalUrl;
    debug('proxing', url);

    request({
        url: url,
        method: req.method,
        headers: req.headers,
        gzip: true,
        encoding: null
    }, function(err, response, body) {
        if (err) {
            var msg = 'proxy error:' + err.message;
            console.error(msg);
            return res.status(500).end(msg);
        }
        _.forOwn(response.headers, (v, k) => {
            res.set(normalize(k), normalize(v));
        });
        var resultStr = body;
        if (isHTML(response.headers)) {
            var cs = charset(response.headers, body) || 'utf8';
            var html = body.toString(cs);
            html = injector.injectWdScripts(html).toString(cs);
            res.set('content-type', `text/html;charset=${cs}`);
            res.set('content-length', Buffer.byteLength(html));
            resultStr = html;
        }
        debug('proxy complete', response.statusCode);
        debug('content', string(resultStr).summary(1024));
        debug('headers', response.headers);
        res.status(response.statusCode).end(resultStr);
    });
}

function isHTML(headers) {
    return headers && headers['content-type'] && headers['content-type'].match('text/html');
}

function normalize(str) {
    return String(str || '').trim();
}

export default proxy;
