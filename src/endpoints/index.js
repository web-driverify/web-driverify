import EventEmitter from 'events';
import session from '../utils/session.js';
import express from 'express';
import _ from 'lodash';
import Debug from 'debug';

let debug = Debug('Endpoint');
let registry = new Map();
let router = express.Router();
let id = 0;
let pool = new Map();
let emitter = new EventEmitter();

// https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#response-status-codes

router.param('sid', session.sessionById);

class Endpoint {
    constructor() {
        this.id = id++;
        this.status = 'waiting';
        this.args = _.slice(arguments);
        this.confirmationRequired = true;
        pool.set(this.id, this);

        emitter.emit('created', this);
    }

    resultArrived(result, session) {
        // FIXME
        if (!this.session) {
            debug('why no session here?');
            this.session = session;
        }
        result = this.transform(result, session);
        this.exit(result);
    }

    errorArrived(err) {
        this.status = 'fail';
        this.data = {
            sessionById: this.session.id,
            status: err.status,
            value: err.message
        };
        if (err.message === 'Unimplemented') {
            this.response.status(501).json(this.data);
        } else {
            this.response.json(this.data);
        }
        pool.delete(this.id);
        emitter.emit('fail', this);
    }

    /*
     * return and exit a endpoint
     */
    exit(result) {
        this.status = 'exit';
        this.data = {
            sessionId: this.session.id,
            status: 0,
            value: result
        };
        this.response.json(this.data);
        pool.delete(this.id);
        emitter.emit('exit', this);
    }

    /*
     * Data transfer object for rpc
     */
    dto() {
        return {
            id: this.id,
            name: this.constructor.name,
            args: this.args
        };
    }

    /*
     * post transform of browser returned data
     */
    transform(data) {
        return data;
    }
    toString() {
        return `${this.constructor.name}(${this.id})${JSON.stringify(this.args)}`;
    }
    static on(name, cb) {
        return emitter.on(name, cb);
    }
    static once(name, cb) {
        return emitter.once(name, cb);
    }
    static getLastId() {
        return id - 1;
    }

    /*
     * Register a Endpoint Implementation
     */
    static register(EndpointImpl) {
        if (registry.has(EndpointImpl.name)) {
            throw new Error(`command ${EndpointImpl.name} already registered`);
        }
        registry.set(EndpointImpl.name, EndpointImpl);
        EndpointImpl.express(router);
        return EndpointImpl;
    }

    /*
     * Express middleware for WebDriver HTTP API
     */
    static express() {
        router.use('/session/:sid', sessionRequired);
        router.use(unkownEndpoint);
        router.use(pushIntoSessionQueue);
        return router;
    }

    /*
     * Endpoint population middleware
     */
    static endpointById(req, res, next, id) {
        req.endpoint = Endpoint.get(id);
        if (req.endpoint) {
            next();
        } else {
            var err = new Error(`endpoint ${id} not found`);
            err.status = 404;
            next(err);
        }
    }

    static get(id) {
        debug(`finding endpoint in ${pool.keys()} by id ${id}...`);
        id = Number(id);
        return pool.get(id);
    }
}

function pushIntoSessionQueue(req, res) {
    req.endpoint.session = req.session;
    req.endpoint.response = res;
    if (req.session) {
        req.session.cmdQueue.push(req.endpoint);
    }
}

function sessionRequired(req, res, next) {
    if (req.session) return next();
    res.json({
        sessionId: req.sessionId,
        status: 6,
        value: 'NoSuchDriver'
    });
}

function unkownEndpoint(req, res, next) {
    if (req.endpoint) return next();
    res.json({
        sessionId: req.session.id,
        status: 9,
        value: "UnknownCommand"
    });
}

export default Endpoint;
