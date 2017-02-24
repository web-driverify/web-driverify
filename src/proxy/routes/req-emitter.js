function emitter(req, res, next) {
    req.app.emit('requested', req);
    next();
}

export default emitter;
