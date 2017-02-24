import request from 'request';
import charset from 'charset';
import _ from 'lodash';
import Debug from 'debug';
import injector from '../utils/injector.js';

let debug = Debug('wd:proxy:routes:external');

function proxy(req, res) {
    var url = req.originalUrl;
    debug('proxing', url);
    request({
        url: url,
        gzip: true,
        encoding: null
    }, function(err, response, body) {
        if (err) {
            return res.status(500).end('proxy error:' + err.stack);
        }
        _.forOwn(response.headers, (v, k) => {
            res.set(k, v);
        });
        var resultStr = body;
        if (isHTML(response.headers)) {
            var cs = charset(response.headers, body) || 'utf8';
            var html = body.toString(cs);
            html = injector.injectWdScripts(html, req.session);
            res.set('content-type', 'text/html;charset=utf8');
            res.set('content-length', Buffer.byteLength(html));
            resultStr = html;
        }
        res.status(response.statusCode).end(resultStr);
    });
}

function isHTML(headers) {
    return headers && headers['content-type'] && headers['content-type'].match('text/html');
}


export default proxy;
