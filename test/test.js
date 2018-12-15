var { expect } = require('chai');

const enforceConstants = require('../index.js');

describe('enforceConstants', function() {
  it('allows you to access keys that are defined', function() {
    const returnedConstants = enforceConstants({ foo: 'bar' });
    expect(returnedConstants.foo).to.eql('bar');
  });

  it('returns an error if accessing an undefined key', function() {
    const returnedConstants = enforceConstants({ foo: 'bar' });

    try {
      returnedConstants.notDefined
      throw new Error('should not see');
    } catch (error) {
      expect(error.message).to.eql('notDefined is not defined on an object enforcing constant access');
    }
  });

  it('allows giving a specific name to an object', function() {
    const returnedConstants = enforceConstants({ foo: 'bar' }, 'foo bar variables');

    try {
      returnedConstants.notDefined
      throw new Error('should not see');
    } catch (error) {
      expect(error.message).to.eql('notDefined is not defined on an object enforcing constant access [foo bar variables]');
    }
  });

  it('can be printed to the console', function() {
    const returnedConstants = enforceConstants({ foo: 'bar' }, 'foo bar variables');
    console.log(returnedConstants);
  });

  it('allows you to use symbols for keys', function() {
    const foo = Symbol.for('foo');
    const returnedConstants = enforceConstants({ [foo]: 'bar' }, 'foo bar variables');

    expect(returnedConstants[foo]).to.eql('bar');
  });

  it('does not allow redefining keys', function() {
    const returnedConstants = enforceConstants({ foo: 'bar' }, 'foo bar variables');
    expect(returnedConstants.foo).to.eql('bar');

    try {
      returnedConstants.foo = 'hello';
      throw new Error('should not see');
    } catch (error) {
      expect(error.message).to.eql('Cannot modify an object enforcing constant access');
    }
  });

  it('does not allow deleting properties', function() {
    const returnedConstants = enforceConstants({ foo: 'bar' }, 'foo bar variables');

    try {
      delete returnedConstants.foo
      throw new Error('should not see');
    } catch (error) {
      expect(error.message).to.eql('Cannot delete properties of an object enforcing constant access');
    }
  });
});
