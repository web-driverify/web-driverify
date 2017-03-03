import Debug from 'debug';

let debug = Debug('wd:proxy:routes:utils');

function pending(req, res, next) {
    debug(req.method.toUpperCase(), req.originalUrl, 'pending...');
    next();
}

function emitter(req, res, next) {
    req.app.emit('requested', req);
    next();
}

export default { emitter, pending };
