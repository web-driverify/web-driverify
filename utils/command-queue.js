var Promise = require('bluebird');
var debug = require('debug')('wd:utils:command-queue');

function CommandQueue() {
    this.cmdReceiver = null;
    this.queue = [];
    this.pending = Promise.resolve();
}

CommandQueue.prototype.push = function(cmd) {
    debug('pushing command', cmd.type, cmd.id);
    this.queue.push(cmd);
    // make a try on appended
    this.trySendCmd();
};

CommandQueue.prototype.front = function() {
    debug('retrieving command');
    return new Promise((resolve) => {
        this.cmdReceiver = resolve;
        // make a try on requested
        this.trySendCmd();
    });
};

CommandQueue.prototype.trySendCmd = function() {
    debug('try sending command');
    if (this.queue.length === 0) return;

    var cmd = this.queue[0];
    if (cmd.status === 'waiting' && this.cmdReceiver) {
        debug('sending command', cmd.type, cmd.id);
        cmd.status = 'pending';
        this.cmdReceiver(cmd);
        this.cmdReceiver = null;
    }
};

CommandQueue.prototype.sendFailed = function() {
    debug('send failed, recovering front command');
    if (this.queue.length === 0) return;
    this.queue[0].status = 'waiting';
};

CommandQueue.prototype.pop = function(data) {
    debug('poping command with result', data);
    var cmd = this.queue.shift();
    cmd.exit(data);
};

module.exports = CommandQueue;
