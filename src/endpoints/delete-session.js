import Endpoint from '.';
import env from '../utils/env.js';
import pkg from '../../package.json';

class DeleteSession extends Endpoint {
    static express(router) {
        router.delete('/session/:sid', (req, res, next) => {
            req.endpoint = new DeleteSession(req.params.sid);
            next();
        });
    }
    transform() {
        return 'deleted';
    }
}

export default Endpoint.register(DeleteSession);
