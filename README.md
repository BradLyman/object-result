# object-result

Result object represent either an error or a successful computation.

## Usage

Results are never created directly, instead object-assign exposes two factory
functions, createErr and createOk, that construct result objects representing
an error and an ok respectively.

```javascript
  let objectResult = require('object-result'),
      ok = objectResult.ok,
      err = objectResult.err;

  // creates a success result with an object used for the success value
  let goodKitty = ok({ a : 100, b : "kitty" });

  // creates an error result with an object used for the error value
  let badKitty = err({ msg : "bad stuff, oh no!" });
```

Sometimes you want to do some transformation on a success or error -- but you
dont want to modify the relative success-state of the result. In this case,
you would use the map/map_err methods.

```javascript
  // map the goodKitty's success value from the object (from above) to just
  // a string.
  goodKitty.map(function(value) {
    return value.b;
  });

  // map the badKitty's error value from the object above to just a string
  badKitty.map_err(function(errVal) {
    return errVal.msg;
  });

  // map only effects ok's and map_err only effects err's
  // so...

  goodKitty.map_err(function(val) {
    return "super " + val;
  });

  badKitty.map(function(errMsg) {
    return "Error: " + errMsg;
  });

  // have no effect
```

Sometimes more flexibility is needed -- in particular you may need continue a
computation but only if no error has occured. In this case, one should use
the and_then/or_else methods.

```javascript
  // and_then is good for continuing successful computations
  let newKitty = goodKitty.and_then(function(value) {
    return some_operation_that_may_fail(value);
  });

  // or_else is good for handling errors -- or transforming them into successes
  let newKitty = badKitty.or_else(function(value) {
    return some_operation_that_may_fix_error(value);
  });
```

It can be useful to chain or_else or and_then methods together. However, as a
word of caution -- generally it is a mistake to chain or_else and and_then
methods simultaneously. Use multiple and_then's to continue a successful
computation, or use multiple or_else's to do complex error management, but
don't try to do both at the same time! (it can get confusing very quickly)
