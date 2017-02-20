import express from 'express';
import bodyParser from 'body-parser';
import session from '../../utils/session.js';
import Debug from 'debug';
import Endpoint from '../../endpoints';

let router = express.Router();
let debug = Debug('wd:proxy:routes:command');
let id = 0;

router.use(bodyParser.json({
    // doc: https://www.npmjs.com/package/body-parser
    strict: false
}));
router.use(session.sessionByReq);
router.param('eid', Endpoint.endpointById);

router.get('/', function(req, res, next) {
    res.set('content-type', 'text/html');
    if (req.endpoint.name !== 'NewSession') {
        console.warn('connection failed:', e.message);
        res.render('connect-fail.html');
    } else {
        session.createSession(req);
        req.endpoint.responseArrived(null, req.session);
        res.render('connect-success.html', req.session);
    }
});

router.get('/command', session.sessionRequired, function(req, res, next) {
    id++;
    debug('command polling requested', id);
    req.session.cmdQueue.front()
        .then(cmd => {
            debug('command polling responsing', id);
            res.json(cmd.dto());
        })
        .catch(err => {
            req.session.cmdQueue.sendFailed(err);
            next(err);
        });
});

router.post('/result/:eid', session.sessionRequired, function(req, res) {
    debug('command result received', req.body);
    try {
        var result = req.body;
    } catch (e) {
        var msg = 'invalid json: ' + req.body;
        debug(msg);
        return res.status(400).end(msg);
    }
    req.session.cmdQueue.pop();
    req.endpoint.responseArrived(result);
    res.end('received');
});

router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

router.use(function(err, req, res, next) {
    var status = err.status || 500;
    debug(err.stack);
    res.status(status).end(err.stack);
});

export default router;
