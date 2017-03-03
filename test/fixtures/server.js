import express from 'express';
import Debug from 'debug';

let debug = Debug('wd:fixtures:server');
let app = express();

app.use(function(req, res, next) {
    debug(req.originalUrl, 'requested');
    next();
});

app.get('/wellformed', (req, res) => {
    var html = '<html><head></head><body>foo</body></html>';
    res.set('content-type', 'text/html').end(html);
});

app.get('/emptyhtml', (req, res) => {
    var html = '<html></html>';
    res.set('content-type', 'text/html').end(html);
});

app.get('/empty', (req, res) => {
    var html = '';
    res.set('content-type', 'text/html').end(html);
});

app.get('/plain-html', (req, res) => {
    var html = [
        '<form>',
        '  <label class="control-label">Homepage</label>',
        '  <input id="url" value="http://harttle.com">',
        '</form>'
    ];
    res.set('content-type', 'text/html').end(html.join('\n'));
});

app.get('/css', (req, res) => {
    var css = 'div{color: red}';
    res.set('content-type', 'text/stylesheet').end(css);
});

export default app;
