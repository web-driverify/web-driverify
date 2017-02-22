import Endpoint from '.';
import env from '../utils/env.js';

class NewSession extends Endpoint {
    constructor(data) {
        super(data);
    }
    static express(router) {
        router.post('/session', (req, res, next) => {
            req.endpoint = new NewSession(req.body);
            let url = `${env.proxyUrl}/wd?cmd=${req.endpoint.id}`;
            console.log(`newSession requested, open the following URL:\n ${url}`);
            next();
        });
    }
    transform() {
        return {
            browserName: 'any',
            browserVersion: 'any',
            platformName: 'any',
            acceptInsecureCerts: 'true',
            pageLoadStrategy: 'normal',
            proxy: {
                proxyType: 'system',
                proxyAutoconfigUrl: '',
                ftpProxy: '',
                ftpProxyPort: '',
                httpProxy: '',
                httpProxyPort: '',
                sslProxy: '',
                sslProxyPort: '',
                socksProxy: '',
                socksProxyPort: '',
                socksVersion: '',
                socksUsername: '',
                socksPassword: ''
            },
            timeouts: {
                implicit: 60,
                "page load": 60,
                script: 60
            },
            unhandledPromptBehavior: 'none'
        };
    }
}

export default Endpoint.register(NewSession);
