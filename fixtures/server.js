import express from 'express';
import Debug from 'debug';

let debug = Debug('wd:fixtures:server');
let app = express();

app.use(function(req, res, next) {
    debug(req.originalUrl, 'requested');
    next();
});

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

export default app;
