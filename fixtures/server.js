var express = require('express');
var debug = require('debug')('wd:fixture');

var app = express();

app.get('/wellformed', (req, res) => {
    debug('requesting wellformed');
    var html = '<html><head></head><body>foo</body></html>';
    res.set('content-type', 'text/html').end(html);
});

app.get('/emptyhtml', (req, res) => {
    debug('requesting emptyhtml');
    var html = '<html></html>';
    res.set('content-type', 'text/html').end(html);
});

app.get('/empty', (req, res) => {
    debug('requesting empty');
    var html = '';
    res.set('content-type', 'text/html').end(html);
});

app.get('/css', (req, res) => {
    debug('requesting css');
    var css = 'div{color: red}';
    res.set('content-type', 'text/stylesheet').end(css);
});

module.exports = app;
