var express = require('express');
var router = express.Router();
var rpc = require('../utils/rpc.js');
var debug = require('debug')('wd:wd:routes');

router.param('sid', rpc.sessionById);

router.post('/session', function(req, res, next) {
    rpc 
        .exec('createSession', null, res.app)
        .then(result => res.json(result))
        .catch(next);
});

router.post('/session/:sid/element', function(req, res, next) {
    rpc
        .exec('findElement', req.session, req.body)
        .then(result => res.json(result))
        .catch(next);
});

router.get('/session/:sid/url', function(req, res, next) {
    rpc
        .exec('getCurrentUrl', req.session)
        .then(result => res.json(result))
        .catch(next);
});

module.exports = router;
