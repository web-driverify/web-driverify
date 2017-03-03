(function() {
    var wd = window.webDriverify;

    wd.handlers.DeleteSession = function() {
        wd.state = 'closing';
        wd.sendResult(this, 'closing', function() {
            window.close();
        });
    };

    wd.handlers.FindElement = function(query) {
        var el = document.querySelector(sel);
        wd.sendResult(this, el);
    };

    wd.handlers.FindElements = function(sel) {
        var els = document.querySelectorAll(sel);
        wd.sendResult(this, els);
    };
})();
