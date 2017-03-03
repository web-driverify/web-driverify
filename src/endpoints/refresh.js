import Endpoint from '.';
import Debug from 'debug';

let debug = Debug('wd:endpoints:Refresh');

class Refresh extends Endpoint {
    static express(router) {
        router.post('/session/:sid/refresh', (req, res, next) => {
            req.endpoint = new Refresh();
            req.session.storage.confirm = {
                cmd: req.endpoint.dto(),
                data: 'refresh complete'
            };
            debug('setting confirm data into session', req.session.storage);
            next();
        });
    }
    transform(data, session) {
        debug('client refreshed, clearing session.confirm...');
        session.storage.confirm = null;
        return data;
    }
}

export default Endpoint.register(Refresh);
