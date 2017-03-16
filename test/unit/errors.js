import chai from 'chai'
import {parseStack} from '../../src/utils/error-parser.js'

let expect = chai.expect

describe('errors', function () {
  describe('.parseStack()', function () {
    it('should parse phantom.js user JavaScript', function () {
      var result = parseStack('ElementClick@http://harttle.com/index.js:535:42')
      expect(result).to.deep.equal([{
        methodName: 'ElementClick',
        className: '',
        fileName: 'http://harttle.com/index.js',
        colNumber: 42,
        lineNumber: 535
      }])
    })
    it('should parse phantom.js native code', function () {
      var result = parseStack('DispatchEvent@[native code]')
      expect(result).to.deep.equal([{
        methodName: 'DispatchEvent',
        className: '',
        fileName: '[native code]',
        colNumber: NaN,
        lineNumber: NaN
      }])
    })
    it('should parse webkit user JavaScript', function () {
      var result = parseStack('Error\n  at Utils.ElementClick(http://harttle.com/index.js:535:42)')
      expect(result).to.deep.equal([{
        methodName: 'ElementClick',
        className: 'Utils',
        fileName: 'http://harttle.com/index.js',
        colNumber: 42,
        lineNumber: 535
      }])
    })
  })
})
