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
exports.stubPort = process.env.STUB_PORT || 8087;
exports.proxyPort = process.env.PROXY_PORT || 8088;
exports.wdPort = process.env.WD_PORT || 8089;
exports.name = process.env.NODE_ENV || 'production';
exports.host = process.env.HOST || 'localhost';

exports.proxyUrl = 'http://' + exports.host + ':' + exports.proxyPort;
exports.stubUrl = 'http://' + exports.host + ':' + exports.stubPort;
