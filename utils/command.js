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

Command.prototype.isImmediateInvoked = function() {
    return ['go', 'refresh', 'forward', 'back'].indexOf(this.type) > -1;
};

Command.prototype.exit = function(data) {
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

Command.prototype.toString = function() {
    return this.type + `(${this.id})`;
};

module.exports = Command;
