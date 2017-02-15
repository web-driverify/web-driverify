const chai = require('chai');
const expect = chai.expect;
const proxy = require('../proxy');
const wd = require('../wd');
const request = require('supertest');
const Command = require('../utils/command.js');

describe('POST /session', function() {
    it('should respond with created session', function(done) {
        request(wd).post(`/session`)
            .expect(res => {
                expect(res.body).to.have.property('sessionId');
                expect(res.body).to.have.deep.property('capabilities.browserName');
            })
            .expect(200, done);

        setTimeout(function() {
            var cmdId = Command.getLastId();
            var url = '/wd?cmd=' + cmdId;
            request(proxy).get(url)
                .expect(200, function() {
                    console.log('browser connected');
                });
        }, 100);
    });
});
