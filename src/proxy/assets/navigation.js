(function() {
    var wd = window.webDriverify;

    wd.handlers.GetCurrentUrl = function() {
        var url = window.location.href;
        wd.sendResult(this, url);
    };
    wd.handlers.Go = function(url) {
        wd.state = 'navigating';
        location.href = url;
    };
    wd.handlers.Back = function() {
        wd.state = 'navigating';
        history.back();
    };
    wd.handlers.Forward = function() {
        wd.state = 'navigating';
        history.forward();
    };
    wd.handlers.Refresh = function() {
        wd.state = 'navigating';
        location.reload();
    };
    wd.handlers.GetTitle = function() {
        wd.sendResult(this, document.title);
    };
})();
