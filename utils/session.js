import _ from 'lodash';
import crypto from 'crypto';
import CommandQueue from './command-queue.js';
import Debug from 'debug';
import Promise from 'bluebird';

var debug = Debug('wd:utils:session');
var sessions = {};

function createSession(req) {
    var id = hash(req);
    req.session = sessions[id] = {
        id: id,
        ip: req.ip,
        ua: req.headers['user-agent'],
        cmdQueue: new CommandQueue()
    };
    return req.session;
}

function sessionByReq(req, res, next) {
    var id = hash(req);
    req.session = sessions[id];
    next();
}

function sessionById(req, res, next, id) {
    req.session = sessions[id];
    next();
}

function hash(req) {
    var sum = crypto.createHash('md5');
    sum.update(req.ip);
    sum.update(req.headers['user-agent']);
    return sum.digest('hex');
}

function sessionRequired(req, res, next) {
    if (!req.session) {
        var e = new Error('session not connected');
        e.status = 403;
        next(e);
    } else {
        next();
    }
}

export default {
    createSession,
    sessionById,
    sessionByReq,
    sessionRequired
};
