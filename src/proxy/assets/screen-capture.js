(function() {
    var wd = window.webDriverify;

    wd.handlers.DeleteSession = function() {
        wd.state = 'closing';
        return 'closing';
    };
    wd.handlers.DeleteSession.success = function() {
        window.close();
    };

    wd.handlers.Screenshot = function() {
        return window.html2canvas(document.body)
            .then(function(canvas) {
                var str = canvas.toDataURL('image/png');
                str = str.replace(/^data:[^;]*;base64,/, '');
                return str;
            });
    };
})();
