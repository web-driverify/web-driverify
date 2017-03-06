import { getWD } from '../utils/wd.js';

let wd = getWD();

wd.handlers.Screenshot = function() {
    if (!window.html2canvas) {
        throw new Error('Unimplemented');
    }
    return window.html2canvas(document.body)
        .then(function(canvas) {
            let str = canvas.toDataURL('image/png');
            str = str.replace(/^data:[^;]*;base64,/, '');
            return str;
        });
};
