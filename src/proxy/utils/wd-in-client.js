(function() {
    console.log('web-driverify loading...');

    var session = "{{session}}";
    var state = 'init';

    init();

    function init() {
        var confirm = session.confirm;
        if (confirm) {
            sendResult(confirm.cmd, confirm.data, function() {
                startPoll();
            });
        } else {
            startPoll();
        }
    }

    function startPoll() {
        state = 'running';
        poll();
    }

    var commandHandlers = {
        GetCurrentUrl: function() {
            var url = window.location.href;
            sendResult(this, url);
        },
        FindElement: function(sel) {
            var el = document.querySelector(sel);
            sendResult(this, el);
        },
        DeleteSession: function() {
            state = 'closing';
            sendResult(this, 'closing', function() {
                window.close();
            });
        },
        FindElements: function(sel) {
            var els = document.querySelectorAll(sel);
            sendResult(this, els);
        },
        // https: //www.w3.org/TR/webdriver/#dfn-go
        Go: function(url) {
            state = 'navigating';
            location.href = url;
        },
        Back: function() {
            state = 'navigating';
            history.back();
        },
        Forward: function() {
            state = 'navigating';
            history.forward();
        },
        Refresh: function() {
            state = 'navigating';
            location.reload();
        },
        GetTitle: function() {
            sendResult(this, document.title);
        }
    };

    function sendResult(cmd, data, cb) {
        cb = cb || noop;
        console.log('sending result ' + JSON.stringify(data) +
            ' for command ' + cmd.name + '(' + cmd.id + ')');

        ajax({
            url: '/wd/result/' + cmd.id,
            data: data,
            method: 'POST',
            success: function(data) { cb(null, data); },
            fail: function(xhr) { cb(xhr); }
        });
    }

    function poll() {
        if (state !== 'running') return;
        console.log('polling');
        ajax({
            url: '/wd/command',
            success: function(cmd) {
                if (state !== 'running') return;
                console.log('command received', JSON.stringify(cmd));
                execCommand(cmd);
                poll();
            },
            error: function(xhr, textStatus, error) {
                if (state !== 'running') return;
                console.log('error when polling, status:',
                    JSON.stringify(textStatus),
                    ',error:', JSON.stringify(error));
                setTimeout(function() {
                    poll();
                }, 1000);
            }
        });
    }

    function execCommand(cmd) {
        var handler = commandHandlers[cmd.name];
        if (!handler) {
            sendResult(cmd, {
                error: 'unkownd command',
                message: 'entrypoint ' + cmd.name + ' not found',
                stacktrace: (new Error()).stack
            });
            return;
        }
        handler.apply(cmd, cmd.args);
    }

    function ajax(settings) {
        settings.success = settings.success || noop;
        settings.error = settings.error || noop;
        settings.always = settings.always || noop;

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
                settings.success(data, xhr);
            } else {
                settings.error(xhr);
            }
            settings.always(xhr);
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

    function noop() {}
})();
