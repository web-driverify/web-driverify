const env = require('../utils/env.js');
const debug = require('debug')('wd:utils:server-commands');

var cmdPool = new Map();

var cmdHandlers = {
    createSession: function(app) {
        var url = 'http://' + env.ip + ':' + env.proxyPort + '/wd?cmd=' + this.id;
        console.log('createSession requested, open the following URL:\n' + url);
        app.emit('createSessionRequested', this);
    },
    stat: function() {
        var stat = {
            ready: true,
            message: 'webdriver listening on ' + env.wdPort +
                ', browser proxy listening on ' + env.proxyPort
        };
        console.log('server status:', stat);
        this.exit(stat);
    }
};

function add(cmd) {
    debug(`adding command ${cmd} into cmdPool`);
    cmdPool.set(cmd.id, cmd);
    var handler = cmdHandlers[cmd.type];
    if (!handler) {
        throw new Error(`${cmd.type} is not a server command`);
    }
    handler.apply(cmd, cmd.args);
}

function exit(cmdId, result) {
    var cmd = cmdPool.get(Number(cmdId));
    if (!cmd) {
        var e = new Error(`command ${cmdId} not found`);
        e.code = 'ENOCMD';
        throw e;
    }
    debug(`exiting command ${cmd} from cmdPool`);

    cmd.exit(result);
    cmdPool.delete(cmdId);
}

exports.add = add;
exports.exit = exit;
