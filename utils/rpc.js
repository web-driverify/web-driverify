const _ = require('lodash');
const crypto = require('crypto');
const CommandQueue = require('./command-queue.js');
const ServerCmds = require('./server-commands.js');
const Command = require('./command.js');
const debug = require('debug')('wd:utils:rpc');
const Promise = require('bluebird');

var sessions = {};

function exec(type, session) {
    debug('exec cmd', type);
    var args = _.slice(arguments, 2);

    return new Promise(function(resolve) {
        var cmd = new Command(type, args, resolve);
        if (session) {
            session.cmdQueue.push(cmd);
        } else {
            ServerCmds.add(cmd);
        }
    });
}

function createSession(req) {
    var id = hash(req);
    req.session = sessions[id] = {
        id: id,
        ip: req.ip,
        ua: req.headers['user-agent'],
        cmdQueue: new CommandQueue()
    };
    // spec: https://www.w3.org/TR/webdriver/#dfn-new-session
    req.session.cmdQueue.push(new Command('setActive'));
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
    } else{
        next();
    }
}

exports.exec = exec;
exports.createSession = createSession;
exports.sessionById = sessionById;
exports.sessionByReq = sessionByReq;
exports.sessionRequired = sessionRequired;
