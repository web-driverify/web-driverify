import Debug from 'debug';
import string from '../../utils/string.js';

let debug = Debug('wd:proxy:routes:utils');

function pending(req, res, next) {
    debug(req.method.toUpperCase(), string(req.originalUrl).summary(), 'pending...');
    next();
}

function emitter(req, res, next) {
    req.app.emit('requested', req);
    next();
}

export default { emitter, pending };
