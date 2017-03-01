import Endpoint from '.';
import Debug from 'debug';

let debug = Debug('wd:endpoints:Back');

class Back extends Endpoint {
    static express(router) {
        router.post('/session/:sid/back', (req, res, next) => {
            req.endpoint = new Back();
            req.session.storage.confirm = {
                cmd: req.endpoint.dto(),
                data: 'back complete'
            };
            next();
        });
    }
    transform(data, session) {
        debug('client refreshed, clearing session.confirm...');
        session.storage.confirm = null;
        return data;
    }
}

export default Endpoint.register(Back);
