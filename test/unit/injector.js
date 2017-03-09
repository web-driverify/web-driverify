import chai from 'chai';
import { injectScript } from '../../src/utils/injector.js';

let expect = chai.expect;

describe('injector', function() {
    it('should inject empty text', function() {
        var src = injectScript('', 'foo');
        expect(src).to.equal('foo');
    });
    it('should inject empty html', function() {
        var src = injectScript('<html></html>', 'foo');
        expect(src).to.equal('<html>foo</html>');
    });
    it('should inject into body when no head exist', function() {
        var src = injectScript('<html><body>foo</body></html>', 'bar');
        expect(src).to.equal('<html><body>barfoo</body></html>');
    });
    it('should inject wellformed html', function() {
        var src = injectScript('<html><head>foo</head><body></body></html>', 'bar');
        expect(src).to.equal('<html><head>barfoo</head><body></body></html>');
    });
});
