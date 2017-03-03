import express from 'express';
import morganDebug from 'morgan-debug';
import Liquid from 'shopify-liquid';
import env from '../utils/env.js';
import commandMiddleware from './routes/command';
import externalMiddleware from './routes/external.js';
import utils from './routes/utils.js';
import session from '../utils/session.js';
import path from 'path';

let engine = new Liquid({
    cache: env.name === 'production',
    root: __dirname + '/../views/',
    extname: '.html'
});
let app = express();

app.engine('html', engine.express());
app.set('views', __dirname + '/../views');
app.set('view engine', 'html');

app.use(morganDebug('wd:proxy', 'dev'));

app.use('/web-driverify/node_modules', express.static(
    path.resolve(__dirname, '../../node_modules')));
app.use('/web-driverify/assets', express.static(
    path.resolve(__dirname, './assets')));

app.use(utils.pending, session.sessionByReq, utils.emitter);
app.use('/web-driverify', commandMiddleware);
app.use(externalMiddleware);

export default app;
