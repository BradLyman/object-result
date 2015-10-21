'use strict';
let objectResult = require('./index.js'),
    ok           = objectResult.createOk,
    err          = objectResult.createErr;

let timesTwo = (i) => i * 2;

ok(3)
  .map(timesTwo)
  .and_then(console.log);

err(2)
  .map(timesTwo)
  .or_else(console.log);

err(10)
  .map_err(timesTwo)
  .or_else(console.log);

let matcher = {
  ok  : (val) => { console.log(val); },
  err : (err) => { return ok(err);}
};

ok(3).match(matcher);

err(10).match(matcher).and_then(console.log);

