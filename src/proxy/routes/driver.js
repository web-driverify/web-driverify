import express from 'express';
import bodyParser from 'body-parser';
import session from '../../utils/session.js';
import Debug from 'debug';
import Endpoint from '../../endpoints';
import { injectWdScripts } from '../../utils/injector.js';

let router = express.Router();
let debug = Debug('wd:proxy:routes:command');

router.use(bodyParser.json({
    // doc: https://www.npmjs.com/package/body-parser
    limit: '50mb',
    strict: false
}));
router.param('eid', Endpoint.endpointById);

router.get('/', function(req, res) {
    res.set('content-type', 'text/html');
    var endpoint = Endpoint.get(req.query.cmd);
    if (!endpoint) {
        console.warn('init session failed:', `endpoint not found for cmd: ${req.query.cmd}`);
        res.status(404).render('connect-fail.html');
    } else if (endpoint.constructor.name !== 'NewSession') {
        console.warn('init session failed:', `endpoint for ${req.query.cmd} is not a NewSession cmd`);
        res.status(400).render('connect-fail.html');
    } else {
        console.log(`initializing session with cmd ${req.query.cmd}...`);
        session.createSession(req);
        endpoint.resultArrived(null, req.session);

        res.render('connect-success.html', {
            ip: req.session.ip,
            ua: req.session.ua,
            id: req.session.id,
            wdScripts: injectWdScripts('')
        });
    }
});

router.get('/command', session.required, function(req, res, next) {
    req.session.cmdQueue.front()
        .then(cmd => {
            debug(`cmd ${cmd} retrieved, sending...`);
            res.json(cmd.dto());
        })
        .catch(err => {
            req.session.cmdQueue.sendFailed(err);
            next(err);
        });
});

router.get('/session', session.required, function(req, res) {
    debug('session requested', req.session.dto());
    res.json(req.session.dto());
});

router.post('/result/:eid', session.required, function(req, res) {
    var cmd = req.session.cmdQueue.pop();
    debug(`result for ${cmd} arrived`);
    req.endpoint.resultArrived(req.body, req.session);
    res.end('received');
});

router.post('/error/:eid', session.required, function(req, res) {
    var cmd = req.session.cmdQueue.pop();
    debug(`error for ${cmd} arrived`);
    req.endpoint.errorArrived(req.body, req.session);
    res.end('received');
});

router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

router.use(function(err, req, res, next) {
    var status = err.status || 500;
    if (status === 500) {
        debug(err.stack);
    }
    res.status(status).end(err.stack);
});

export default router;
