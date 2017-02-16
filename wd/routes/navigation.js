var express = require('express');
var router = express.Router();
var rpc = require('../../utils/rpc.js');
var debug = require('debug')('wd:wd:routes:navigation');

router.param('sid', rpc.sessionById);

router.post('/session/:sid/url', function(req, res, next) {
    debug('req.body', req.body);
    rpc
        .exec('go', req.session, req.body)
        .then(result => res.json(result))
        .catch(next);
});

module.exports = router;
