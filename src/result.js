/**
 * Contains methods for manipulating and using Result objects
 * which represent either a success (Ok) or failure (Err) for
 * an operation.
 * @module object-result
 **/

/**
 * Result object which represents either a success (Ok) or failure
 * (Err) of an operation.
 * @typedef Result
 * @type {Object}
 * @property {(Object|undefined)} Ok
 * @property {(Object|undefined)} Err
 **/

/**
 * Callback for the Map operation on a Result.
 * @callback applyOkFn
 * @param {Object} Ok - Ok value of the Result.
 * @return {Object} Ok value for new Result.
 **/

/**
 * Creates a Result with Err set to the provided value.
 * @param {Object} err - Information about the error you wish to report.
 * @return {Result}
 **/
module.exports.Err = function(err) {
  return { Err : err };
};

/**
 * Creates a Result with Ok set to the provided value.
 * @param {Object} ok - Information about the successful operation.
 * @return {Result}
 **/
module.exports.Ok = function(ok) {
  return { Ok : ok };
};

var is_err =
/**
 * Returns true if the Result is an error.
 * @param {Result} result
 * @return {Boolean}
 **/
module.exports.is_err = function(result) {
  return result.Err !== undefined;
};

var is_ok =
/**
 * Returns true if the Result is ok.
 * @param {Result} result
 * @return {Boolean}
 **/
module.exports.is_ok = function(result) {
  return result.Ok !== undefined;
};

/**
 * Modifies the Ok value of the Result by applying the function to the
 * Ok value, leaving an Err value untouched.
 * @param {Result} result - Result to map.
 * @param {applyOkFn} cb - Function to apply to the Ok value.
 * @return {Result}
 **/
module.exports.map = function(result, cb) {
  if (is_ok(result)) {
    result.Ok = cb(result.Ok);
  }

  return result;
};

/**
 * Modifies the Err value of the Result by applying the function to the
 * Err value, leaving an Ok value untouched.
 * @param {Result} result - Result to map.
 * @param {applyErrFn} cb - Function to apply to the Err value.
 * @return {Result}
 **/
module.exports.map_err = function(result, cb) {
  if (is_err(result)) {
    result.Err = cb(result.Err);
  }

  return result;
};















