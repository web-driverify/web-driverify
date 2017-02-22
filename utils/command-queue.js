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
    shouldSendCmd() {
        if (this.queue.length === 0) {
            debug('empty command queue');
            return false;
        }
        if (this.top().status === 'pending') {
            return debug(`${this.top()} still pending`);
        }
        if (!this.cmdReceiver) {
            debug('cmdReceiver does not exist');
            return false;
        }
    }
    trySendCmd() {
        var cmd = this.top();
        if (!this.shouldSendCmd()) {
            debug(`skip sending command ${cmd}...`);
            return;
        }
        cmd.status = 'pending';
        this.cmdReceiver(cmd);
        this.cmdReceiver = null;
        if (cmd.confirmationRequired) {
            this.queue.shift();
            cmd.exit(data);
            this.trySendCmd();
        }
    }
    sendFailed() {
        debug('send failed, recovering front command');
        if (this.queue.length === 0) return;
        this.queue[0].status = 'waiting';
    }
    top() {
        return this.queue[0];
    }
}

export default CommandQueue;
