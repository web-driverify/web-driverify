(function() {
    if (window.webDriverify) {
        console.log('web-driverify already loaded, skipping...');
        return;
    }
    console.log('web-driverify loading...');

    var commandHandlers = {
        // spec: https://www.w3.org/TR/webdriver/#dfn-new-session
        setActive: function() {
            return window.navigator.webdriver = true;
        },
        getCurrentUrl: function() {
            return window.location.href;
        },
        findElement: function(sel) {
            return document.querySelector(sel);
        },
        findElements: function(sel) {
            return document.querySelectorAll(sel);
        },
        go: function(url) {
            return location.href = url;
        },
        back: function() {
            return location.back();
        },
        forward: function() {
            return location.forward();
        },
        refresh: function() {
            return location.reload();
        },
        getTitle: function() {
            return document.title;
        }
    };

    poll();

    function result(cmd, data) {
        data = JSON.stringify(data);
        console.log('sending result ' + data +
            ' (length: ' + data.length + ') ' +
            ' for command ' + JSON.stringify(cmd));

        $.ajax('/wd/result/' + cmd.id, {
            'data': data,
            'type': 'POST',
            'processData': false,
            'contentType': 'application/json'
        });
    }

    function poll() {
        console.log('polling');
        $
            .getJSON('/wd/command')
            .done(function(cmd) {
                console.log('command received', JSON.stringify(cmd));
                var responder = result.bind(null, cmd);
                execCommand(cmd.type, cmd.args, responder);
                poll();
            })
            .fail(function() {
                console.log('error when polling');
                setTimeout(function() {
                    poll();
                }, 3000);
            });
    }

    function execCommand(type, args, responder) {
        var handler = commandHandlers[type];
        if (!handler) {
            return responder({
                error: 'unkownd command',
                message: 'the command ' + type + 'does not exist',
                stacktrace: (new Error()).stack
            });
        }

        var data = handler.apply(null, args);
        return responder(data);
    }

    window.webDriverify = 'webDriverify';
})();
