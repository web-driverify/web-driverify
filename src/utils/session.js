import crypto from 'crypto';
import CommandQueue from './command-queue.js';
import Debug from 'debug';

let debug = Debug('wd:utils:session');
let sessions = new Map();

class Session {
    constructor(req) {
        this.id = hash(req);
        this.ip = req.ip;
        this.ua = req.headers['user-agent'];
        this.cmdQueue = new CommandQueue();
        this.storage = {};
        req.session = this;
        sessions.set(this.id, this);
        debug(`session created: ${this}`);
    }
    toString() {
        return `${this.id}:${this.ip}:${this.ua}`;
    }
    dto() {
        return this.storage;
    }
    remove() {
        return sessions.delete(this.id);
    }
    static createSession(req) {
        return new Session(req);
    }
    static sessionById(req, res, next, id) {
        req.session = sessions.get(id);
        next();
    }
    static sessionByReq(req, res, next) {
        var id = hash(req);
        req.session = sessions.get(id);
        next();
    }
    static sessionRequired(req, res, next) {
        if (!req.session) {
            var e = new Error('session not connected');
            e.status = 403;
            next(e);
        } else {
            next();
        }
    }
}

function hash(req) {
    var sum = crypto.createHash('md5');
    sum.update(req.ip);
    sum.update(req.headers['user-agent']);
    return sum.digest('hex');
}

export default Session;
