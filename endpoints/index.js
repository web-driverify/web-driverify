import session from '../utils/session.js';
import express from 'express';
import _ from 'lodash';

let registry = new Map();
let router = express.Router();
let id = 0;
var pool = new Map();

router.param('sid', session.sessionById);

class Endpoint {
    constructor() {
        this.id = id++;
        this.status = 'waiting';
        this.args = arguments;
        this.confirmationRequired = true;
        pool.set(this.id, this);
    }
    responseArrived(result, session) {
        if (!this.session) {
            this.session = session;
        }
        result = this.transform(result);
        this.exit(result);
    }

    /*
     * return and exit a endpoint
     */
    exit(result) {
        this.status = 'exit';
        this.cb(this.data = {
            sessionId: this.session.id,
            status: 0,
            value: result
        });
        pool.delete(this.id);
    }

    /*
     * Data transfer object for rpc
     */
    dto() {
        return _.pick(this, ['id', 'name', 'args']);
    }

    /*
     * post transform of browser returned data
     */
    transform(data) {
        return data;
    }
    toString() {
        return this.name + `(${this.id})`;
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
        router.use((req, res, next) => {
            if (!req.endpoint) {
                var err = new Error('Not Found');
                err.status = 404;
                return next(err);
            }
            req.endpoint.session = req.session;
            req.endpoint.cb = result => res.json(result);
            if (req.session) {
                req.session.cmdQueue.push(req.endpoint);
            }
        });
        return router;
    }

    /*
     * Endpoint population middleware
     */
    static endpointById(req, res, next, id) {
        req.endpoint = pool.get(id);
        next();
    }
}

export default Endpoint;
