const os = require('os');

function getIPAddr() {
    var ifaces = os.networkInterfaces();
    var ip = null;

    Object.keys(ifaces).forEach(function(ifname) {
        ifaces[ifname].forEach(function(iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                return;
            }
            ip = iface.address;
        });
    });
    return ip;
}

exports.ip = getIPAddr();
exports.testServerPort = process.env.TEST_SERVER_PORT || 8087;
exports.browserPort = process.env.BROWSER_PORT || 8088;
exports.wdPort = process.env.WD_PORT || 8089;
exports.env = process.env.NODE_ENV || 'production';
