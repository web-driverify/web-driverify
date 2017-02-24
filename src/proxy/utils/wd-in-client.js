(function() {
    console.log('web-driverify loading...');

    var session = "{{session}}";

    pendingConfirm();

    function pendingConfirm() {
        var confirm = session.confirm;
        if (confirm) {
            result(confirm.cmd, confirm.data);
        }
    }

    var commandHandlers = {
        GetCurrentUrl: function() {
            return window.location.href;
        },
        FindElement: function(sel) {
            return document.querySelector(sel);
        },
        FindElements: function(sel) {
            return document.querySelectorAll(sel);
        },
        // https: //www.w3.org/TR/webdriver/#dfn-go
        Go: function(url) {
            console.log('navigating to', url);
            location.href = url;
            return null;
        },
        Back: function() {
            return location.back();
        },
        Forward: function() {
            return location.forward();
        },
        Refresh: function() {
            return location.reload();
        },
        GetTitle: function() {
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
            .fail(function(xhr, textStatus, error) {
                console.log('error when polling, status:', JSON.stringify(textStatus), ',error:', JSON.stringify(error));
                setTimeout(function() {
                    poll();
                }, 1000);
            });
    }

    function execCommand(name, args, responder) {
        var handler = commandHandlers[name];
        if (!handler) {
            return responder({
                error: 'unkownd command',
                message: 'the command ' + name + ' does not exist',
                stacktrace: (new Error()).stack
            });
        }

        var data = handler.apply(null, args);
        return responder(data);
    }
})();
