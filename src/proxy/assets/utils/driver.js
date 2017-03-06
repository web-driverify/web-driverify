import { getWD } from './wd.js';
import Promise from 'es6-promise';

let wd = getWD();

function init() {
    wd.state = 'init';
    var confirm = wd.session.confirm;
    if (confirm) {
        sendResult(confirm.cmd, confirm.data, function() {
            wd.state = 'running';
        });
    } else {
        wd.state = 'running';
        poll();
    }
}

function sendResult(cmd, data, cb) {
    console.log('sending result ' + toString(data) + ' for command ' + cmdToString(cmd));
    ajax({
        url: '/web-driverify/result/' + cmd.id,
        data: data,
        method: 'POST',
        cb: function() {
            cb && cb.apply(null, arguments);
            poll();
        }
    });
}


function sendError(cmd, err, cb) {
    err = normalizeError(err);
    console.log('sending error ' + errString(err) + ' for command ' + cmdToString(cmd));
    ajax({
        url: '/web-driverify/error/' + cmd.id,
        data: err,
        method: 'POST',
        cb: function() {
            cb && cb.apply(null, arguments);
            poll();
        }
    });
}

function poll() {
    if (wd.state !== 'running') return;
    console.log('polling');
    ajax({
        url: '/web-driverify/command',
        cb: cmdArrived
    });
}

function cmdArrived(err, cmd) {
    console.log('command received', JSON.stringify(cmd));
    if (wd.state !== 'running') return;
    if (err) {
        console.log('error when polling, status:', arguments[1]);
        return setTimeout(poll, 1000);
    }
    var handler = wd.handlers[cmd.name];
    Promise.resolve(handler)
        .then(function notFound(handler) {
            if (handler) return handler;
            var err = new Error('entrypoint ' + cmd.name + ' not found');
            err.status = 9;
            throw err;
        })
        .then(function exec(handler) {
            return handler.apply(cmd, cmd.args);
        })
        .then(function send(result) {
            if (handler.silent) return;
            sendResult(cmd, result, handler.done);
        })
        .catch(function error(err) {
            sendError(cmd, err, handler.fail);
        });
}

function ajax(settings) {
    settings.cb = settings.cb || noop;

    var xhr = createXHR();

    xhr.open(settings.method || 'GET', settings.url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        if (xhr.status >= 200 && xhr.status < 300) {
            var data = xhr.responseText;
            var contentType = xhr.getResponseHeader('Content-Type');
            if (/application\/json/.exec(contentType)) {
                data = JSON.parse(data);
            }
            settings.cb(null, data, xhr);
        } else {
            settings.cb(xhr, xhr.statusText);
        }
    };
    xhr.send(JSON.stringify(settings.data));
}

function createXHR() {
    var xhr = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
        xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
    }
    if (!xhr) {
        throw new Error('Cannot create an XHR instance');
    }
    return xhr;
}

function errString(err) {
    return err.message + '(' + err.status + ')\n' + err.stack;
}

function toString(obj) {
    if (obj === undefined) obj = null;
    return JSON.stringify(obj).slice(0, 1024);
}

function cmdToString(cmd) {
    return cmd.name + '(' + cmd.id + ')';
}

function normalizeError(err) {
    var message = err.message || 'unkown error';
    var stack = err.stack || (new Error(message)).stack;
    return {
        message: message,
        stack: stack,
        status: err.status || 13
    };
}

function noop() {}

export { init };
