const env = require('../utils/env.js');
const debug = require('debug')('wd:utils:server-commands');

var cmdPool = new Map();

var cmdHandlers = {
    createSession: (cmd) => {
        var url = 'http://' + env.ip + ':' + env.browserPort + '/wd?cmd=' + cmd.id;
        console.log('createSession requested, open the following URL:\n' + url);
    },
    stat: (cmd) => {
        var stat = {
            ready: true,
            message: 'webdriver listening on ' + env.wdPort +
                ', browser proxy listening on ' + env.browserPort
        };
        console.log('server status:', stat);
        cmd.exit(stat);
    }
};

function add(cmd) {
    debug('adding command into cmdPool');
    cmdPool.set(cmd.id, cmd);
    var handler = cmdHandlers[cmd.type];
    if (!handler) {
        throw new Error(`${cmd.type} is not a server command`);
    }
    handler(cmd);
}

function exit(cmdId, result) {
    debug('exiting command from cmdPool');
    var cmd = cmdPool.get(Number(cmdId));
    if (!cmd) {
        var e = new Error(`command ${cmdId} not found`);
        e.code = 'ENOCMD';
        throw e;
    }

    cmd.exit(result);
    cmdPool.delete(cmdId);
}

exports.add = add;
exports.exit = exit;
