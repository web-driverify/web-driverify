import chai from 'chai';
import string from '../../src/utils/string.js';

let expect = chai.expect;

describe('string', function() {
    describe('#summary()', function() {
        it('should create summary of shorter strings', function() {
            expect(string('foo').summary()).to.equal('foo');
        });
        it('should respect to length restriction', function() {
            expect(string('foo').summary(2)).to.equal('fo... (1 more bytes)');
        });
    });
});
