import Endpoint from '.';
import Debug from 'debug';

let debug = Debug('wd:endpoints:Go');

class Go extends Endpoint {
    static express(router) {
        router.post('/session/:sid/url', (req, res, next) => {
            req.endpoint = new Go(req.body.url);
            req.session.storage.confirm = {
                cmd: req.endpoint.dto(),
                data: 'navigation(Go) complete'
            };
            debug('setting storage', JSON.stringify(req.session.storage));
            next();
        });
    }
    transform(data, session) {
        debug('client refreshed, clearing session.confirm...');
        session.storage.confirm = null;
        return data;
    }
}

export default Endpoint.register(Go);
