(function() {
    var wd = window.webDriverify;

    wd.handlers.GetCurrentUrl = function() {
        var url = window.location.href;
        return url;
    };

    wd.handlers.Go = function(url) {
        wd.state = 'navigating';
        location.href = url;
    };
    wd.handlers.Go.silent = true;

    wd.handlers.Back = function() {
        wd.state = 'navigating';
        history.back();
    };
    wd.handlers.Back.silent = true;

    wd.handlers.Forward = function() {
        wd.state = 'navigating';
        history.forward();
    };
    wd.handlers.Forward.silent = true;

    wd.handlers.Refresh = function() {
        wd.state = 'navigating';
        location.reload();
    };
    wd.handlers.Refresh.silent = true;

    wd.handlers.GetTitle = function() {
        return document.title;
    };
})();