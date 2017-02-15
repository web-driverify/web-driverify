const debug = require('debug')('wd:utils:command');
const _ = require('lodash');

var id = 0;

function Command(type, args, cb) {
    cb = cb || function noop() {};
    this.id = id++;
    this.type = type;
    this.args = _.slice(args);
    this.status = 'waiting';
    this.cb = cb;
}

Command.prototype.exit = function(data) {
    debug(`command exiting with value`, data);
    this.data = data;
    this.status = 'exit';
    this.cb(data);
};

Command.getLastId = function() {
    return id - 1;
};

Command.prototype.dto = function() {
    return _.pick(this, ['id', 'type', 'args']);
};

module.exports = Command;
