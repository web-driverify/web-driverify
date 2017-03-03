(function() {
    var wd = window.webDriverify;

    wd.handlers.DeleteSession = function() {
        wd.state = 'closing';
        wd.sendResult(this, 'closing', function() {
            window.close();
        });
    };
})();
