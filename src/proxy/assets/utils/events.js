function ClickEvent() {
    var clickEvent;
    try {
        clickEvent = new window.MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
        });
    } catch (e) {
        clickEvent = document.createEvent('MouseEvent');
        clickEvent.initEvent('click', true, false);
    }
    return clickEvent;
}

export { ClickEvent };
