(function() {
    var wd = window.webDriverify;

    wd.handlers.DeleteSession = function() {
        wd.state = 'closing';
        return 'closing';
    };
    wd.handlers.DeleteSession.success = function() {
        window.close();
    };
})();
