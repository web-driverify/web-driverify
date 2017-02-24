import express from 'express';
import morganDebug from 'morgan-debug';
import Liquid from 'shopify-liquid';
import env from '../utils/env.js';
import Debug from 'debug';
import commandMiddleware from './routes/command';
import externalMiddleware from './routes/external.js';
import reqEmitter from './routes/req-emitter.js';
import session from '../utils/session.js';

let debug = Debug('wd:proxy');
let engine = new Liquid({
    cache: env.name === 'production',
    root: __dirname + '/../views/',
    extname: '.html'
});
let app = express();

app.engine('html', engine.express());
app.set('views', __dirname + '/../views');
app.set('view engine', 'html');

app.use((req, res, next) => {
    debug(req.method.toUpperCase(), req.originalUrl, 'pending...');
    next();
});
app.use(morganDebug('wd:proxy', 'dev'));

app.use(session.sessionByReq);
app.use(reqEmitter);
app.use('/wd', commandMiddleware);
app.use(externalMiddleware);

export default app;
