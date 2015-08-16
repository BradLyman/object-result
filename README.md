# object-assign

Simple error handling via "Result" objects which represent either an error
or a successful computation.

## Usage
A Result can either be Ok or Err.

Results provided a few helper functions like is_err, get_err, and get_ok.
More interesting are the control-flow operators, 'and_then' and 'or_else'.


- ```result.or_else(fn)```
  - executes ```fn``` if ```result``` is an Err. If ```fn``` returns nothing then
    the original result is returned from ```or_else``` otherwise ```fn's``` return
    value is used.

    Examples:

    ```
    // Outputs "2" to the console and leaves result with a value of Err(2).
    var result = Err(2)
      .or_else(console.log);
    ```

    ```
    // Leaves result with a value of Ok("fixed").
    var result = Err(2)
      .or_else(function(i) { return Ok("fixed"); });
    ```

- ```result.and_then(fn)```
  - executes ```fn``` if ```result``` isOk. If ```fn``` returns nothing then
    the original result is returned from ```and_then``` otherwise ```fn's``` return
    value is used.

    Examples:

    ```
    // Result is left with a value of Ok(9).
    var result = Ok(3)
      .and_then(function(i) { return Ok(i * 3); });
    ```

    ```
    // Result is left with a value of Ok(3).
    var result = Ok(3)
      .and_then(console.log);
    ```
## Put It Together

```JavaScript
var objectResult = require('object-assign'),
    Ok           = objectResult.Ok,
    Err          = objectResult.Err;

var timesTwo = function(i) { return Ok(i * 2); };

// Prints 6 to the console
Ok(3)
  .and_then(timesTwo)
  .and_then(console.log);

// Prints 2 to the console
Err(2)
  .and_then(timesTwo)
  .or_else(console.log);

// Prints 20 to the console
Err(10)
  .or_else(timesTwo)
  .and_then(console.log);
```



