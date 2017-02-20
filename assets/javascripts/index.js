(function() {
    if (window.webDriverify) {
        console.log('web-driverify already loaded, skipping...');
        return;
    }
    console.log('web-driverify loading...');

    var commandHandlers = {
        getCurrentUrl: function() {
            return window.location.href;
        },
        findElement: function(sel) {
            return document.querySelector(sel);
        },
        findElements: function(sel) {
            return document.querySelectorAll(sel);
        },
        // https: //www.w3.org/TR/webdriver/#dfn-go
        go: function(data) {
            console.log('going to', data.url);
            location.href = data.url;
            return null;
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
            ' for command ' + cmd.name + '(' + cmd.id + ')');

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
            .ajax({
                url: '/wd/command',
                dataType: 'json',
                // notimeout, see:
                // http://stackoverflow.com/questions/4148830/what-is-jquerys-ajax-default-timeout-value
                timeout: 0
            })
            .done(function(cmd) {
                console.log('command received', JSON.stringify(cmd));
                var responder = cmd.confirmationRequired ?
                    responder = function noop() {} :
                    result.bind(null, cmd);
                execCommand(cmd.name, cmd.args, responder);
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
