import Endpoint from '.';

class Go extends Endpoint {
    constructor(data) {
        super(data);
        this.confirmationRequired = false;
    }
    static express(router) {
        router.post('/session/:sid/url', (req, res, next) => {
            req.endpoint = new Go(req.body.url);
            next();
        });
    }
}

export default Endpoint.register(Go);
