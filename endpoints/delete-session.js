import Endpoint from '.';

class DeleteSession extends Endpoint {
    constructor(data) {
        super(data);
    }
    static express(router) {
        router.delete('/session/:sid', function(req, res, next) {
            req.endpoint = new DeleteSession(res.app, req.body)
            next();
        });
    }
};

Endpoint.register(DeleteSession);

export default DeleteSession;
