var express = require('express');
var bodyParser = require('body-parser');
var rpc = require('../utils/rpc.js');
var morganDebug = require('morgan-debug');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morganDebug('wd:wd', 'dev'));

app.use(require('./routes/sessions.js'));
app.use(require('./routes/navigation.js'));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    err.status || 500;
    console.error(err.stack);
});

module.exports = app;
