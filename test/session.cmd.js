import chai from 'chai';
import proxy from '../proxy';
import wd from '../wd';
import request from 'supertest';
import fixtures from '../fixtures';

let expect = chai.expect;

describe('POST /wd/hub/session', function() {
    it('should respond with created session', function(done) {
        request(wd).post(`/wd/hub/session`)
            .expect(res => {
                expect(res.body).to.have.property('sessionId');
                expect(res.body).to.have.deep.property('capabilities.browserName');
            })
            .expect(200, done);

        wd.once('createSessionRequested', fixtures.startBrowserClient);
        //setTimeout(function() {
        //var cmdId = Command.getLastId();
        //var url = '/wd?cmd=' + cmdId;
        //request(proxy).get(url)
        //.expect(200, function() {
        //console.log('browser connected');
        //});
        //}, 100);
    });
});
