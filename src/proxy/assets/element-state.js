(function() {
    var wd = window.webDriverify;

    wd.handlers.GetElementText = function(id) {
        var el = wd.elements[id];
        if (!el) {
            var err = new Error('StaleElementReference');
            err.status = 10;
            wd.sendError(this, err);
        } else {
            var text = el.innerText;
            console.log('GetElementText sending:', text);
            wd.sendResult(this, text);
        }
    };
})();
