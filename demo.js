var objectResult = require('./index.js'),
    Ok           = objectResult.Ok,
    Err          = objectResult.Err;

var timesTwo = function(i) { return Ok(i * 2); };

Ok(3)
  .and_then(timesTwo)
  .and_then(console.log);

Err(2)
  .and_then(timesTwo)
  .or_else(console.log);

Err(10)
  .or_else(timesTwo)
  .and_then(console.log);
