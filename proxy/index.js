var express = require('express');
var morganDebug = require('morgan-debug');
var Liquid = require('shopify-liquid');
var env = require('../utils/env.js');
const debug = require('debug')('wd:proxy');

var engine = new Liquid({
    cache: env.name === 'production',
    root: __dirname + '/../views/',
    extname: '.html'
});

var app = express();

app.engine('html', engine.express());
app.set('views', __dirname + '/../views');
app.set('view engine', 'html');

app.use(morganDebug('wd:proxy', 'dev'));

app.use('/wd/assets/vendors', express.static(__dirname + '/../node_modules'));
app.use('/wd/assets', express.static(__dirname + '/../assets'));
app.use('/wd', require('./routes/command'));
app.use(require('./routes/external.js'));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    err.status || 500;
    debug(err.stack);
});

module.exports = app;
