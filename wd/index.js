import express from 'express';
import bodyParser from 'body-parser';
import morganDebug from 'morgan-debug';

// endpoints
import Endpoint from '../endpoints';
import '../endpoints/go.js';
import '../endpoints/new-session.js';
import '../endpoints/delete-session.js';
import '../endpoints/find-element.js';

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morganDebug('wd:wd', 'dev'));

app.use('/wd/hub/', Endpoint.express());

app.use(function(err, req, res, next) {
    var status = err.status || 500;
    console.error(err.stack);
    res.status(status).end(err.stack);
});

export default app;
