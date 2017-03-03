(function() {
    var wd = window.webDriverify;

    wd.handlers.DeleteSession = function() {
        wd.state = 'closing';
        wd.sendResult(this, 'closing', function() {
            window.close();
        });
    };

    wd.handlers.Screenshot = function() {
        var self = this;
        var sent = false;
        window.html2canvas(document.body)
            .then(function(canvas) {
                if (sent) return;
                var str = canvas.toDataURL('image/png');
                str = str.replace(/^data:[^;]*;base64,/, '');
                wd.sendResult(self, str);
                sent = true;
            })
            .catch(function(err) {
                if (sent) return;
                wd.sendError(self, err);
                sent = true;
            });
    };
})();
