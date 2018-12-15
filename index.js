'use strict';

const inspect = 'util.inspect.custom';
const toStringTag = 'Symbol.toStringTag';
const iterator = 'Symbol.iterator';

function symbolAsString(str) {
  return `Symbol(${str})`;
}


function enforceConstants(obj, name) {
  const handler = {};
  handler.enforceConstantsName = name;

  handler.set = function(obj, prop) {
    throw new Error('Cannot modify an object enforcing constant access');
  }

  handler.deleteProperty = function(obj, prop) {
    throw new Error('Cannot delete properties of an object enforcing constant access');
  }

  handler.get = function(obj, prop) {
    if (typeof prop === 'symbol') {
      // these handle custom accessors necessary to print an object with
      // console.log in node
      switch (prop.toString()) {
        case symbolAsString(inspect):
          return 'inspect';
          break;
        case symbolAsString(toStringTag):
          return ['EnforceConstantsObject', handler.enforceConstantsName].join('-').trim();
          break;
        case symbolAsString(iterator):
          return null;
          break;
      }
    }

    if (prop in obj) return obj[prop];

    const name = handler.enforceConstantsName ? `[${handler.enforceConstantsName}]` : null;
    const errorString = `${prop} is not defined on an object enforcing constant access`;
    throw new Error([errorString, name].join(' ').trim());
  }

  const proxiedObject = new Proxy(Object.freeze(obj), handler);
  return proxiedObject;
}

module.exports = enforceConstants;
