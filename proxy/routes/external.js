var request = require('request');
var charset = require('charset');
var _ = require('lodash');
var debug = require('debug')('wd:proxy:routes/external');
var scripts = [
    "",
    "<script src='/wd/assets/vendors/jquery/dist/jquery.min.js'></script>",
    "<script src='/wd/assets/javascripts/index.js'></script>",
    ""
].join('\n');
var rhead = /(<head[^>]*>)/;
var rbody = /(<body[^>]*>)/;
var rhtml = /(<html[^>]*>)/;

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
        if (isHTML(response.headers)) {
            var cs = charset(response.headers, body) || 'utf8';
            body = body.toString(cs);
            if (rhead.exec(body)) {
                body = body.replace(rhead, "$1" + scripts);
            } else if (rbody.exec(body)) {
                body = body.replace(rbody, "$1" + scripts);
            } else if (rhtml.exec(body)) {
                body = body.replace(rhtml, "$1" + scripts);
            } else {
                body += scripts;
            }
            res.set('content-type', 'text/html;charset=utf8');
            res.set('content-length', Buffer.byteLength(body));
        }
        res.status(response.statusCode).end(body);
    });
}

function isHTML(headers) {
    return headers && headers['content-type'] && headers['content-type'].match('text/html');
}


module.exports = proxy;
