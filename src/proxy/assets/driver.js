(function() {
    var wd = window.webDriverify;

    (function init() {
        if (window.top !== window) {
            console.log('window not top (maybe iframe?) skipping...');
            return;
        }
        console.log('web-driverify loaded with session', wd.session);

        wd.state = 'init';
        wd.sendResult = sendResult;

        var confirm = wd.session.confirm;
        if (confirm) {
            window.webDriverify.sendResult(confirm.cmd, confirm.data, function() {
                wd.state = 'running';
                poll();
            });
        } else {
            wd.state = 'running';
            poll();
        }
    })();

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
        console.log('sending error ' + toString(err) + ' for command ' + cmdToString(cmd));
        ajax({
            url: '/web-driverify/error/' + cmd.id,
            data: normalizeError(err),
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
        if (!handler) {
            sendError(cmd, {
                message: 'entrypoint ' + cmd.name + ' not found',
                status: 9
            });
        } else {
            try {
                handler.apply(cmd, cmd.args);
            } catch (err) {
                sendError(cmd, err);
            }
        }
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

    function toString(obj) {
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
})();
