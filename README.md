# EnforceConstants

Ensure that the constants you initially define will always be the constants you access.

This is a simple object wrapper that utilizes a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to make sure that elements being accessed have been previously defined and that the object is not changing. Please note that this is not intended to _securely_ enforce that the object is 100% identical to the original object. There are always new and exciting/dangerous ways to modify objects in JavaScript. Rather, this is meant as a help for developers to raise errors early in development and help avoid typos/accessing keys that they _think_ are defined, etc.

Usage:

```javascript
  const enforcedConstants = require('enforced-constants');

  const config = {
    appName: 'test application',
    docxMimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  };

  module.exports = enforcedConstants(config, 'app config');
```

The first argument is the object to "freeze", the second is an optional name so that log messages can be more helpful in explaining what object the bad operation was performed against.

After enforcing the constant access of an object, you can read any of those properties, but you cannot write new properties, update existing ones, or delete properties. It is set against future modification.

I've found this approach helpful in applications that take large number of ENV vars, that interact with a 3rd party API that has field names differing from the code conventions the project uses, or really anywhere I would normally reach for an "Enum" type object.

