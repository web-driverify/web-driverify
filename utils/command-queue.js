import Promise from 'bluebird';
import Debug from 'debug';

let debug = Debug('wd:utils:command-queue');

class CommandQueue {
    constructor() {
        this.cmdReceiver = null;
        this.queue = [];
        this.pending = Promise.resolve();
    }
    push(cmd) {
        debug(`pushing command ${cmd} ...`);
        this.queue.push(cmd);
        // make a try on appended
        if (this.queue.length === 1) {
            debug('command comes to empty queue, trying to send command...');
            this.trySendCmd();
        }
    }
    front = function() {
        debug('retrieving command...');
        return new Promise((resolve) => {
            this.cmdReceiver = resolve;
            // make a try on requested
            this.trySendCmd();
        });
    }
    trySendCmd() {
        if (this.queue.length === 0) {
            return debug('empty command queue, skipping...');
        }
        if (!this.cmdReceiver) {
            return debug('cmdReceiver does not exist, skipping...');
        }
        var cmd = this.queue[0];
        if (cmd.status === 'pending') {
            return debug(`${cmd} still pending, skipping...`);
        }
        debug('sending command', cmd.type, cmd.id);
        cmd.status = 'pending';
        this.cmdReceiver(cmd);
        this.cmdReceiver = null;
        if (cmd.isImmediateInvoked()) {
            this.pop(null);
        }
    }
    sendFailed() {
        debug('send failed, recovering front command');
        if (this.queue.length === 0) return;
        this.queue[0].status = 'waiting';
    }
    pop(data) {
        debug('poping command with result', data);
        var cmd = this.queue.shift();
        cmd.exit(data);
        // make a try when poping
        this.trySendCmd();
    }
}

export default CommandQueue;
