/**
 * Contains methods for manipulating and using Result objects
 * which represent either a success (Ok) or failure (Err) for
 * an operation.
 * @module object-result
 **/

/**
 * @typedef Result
 * @type {Object}
 * @property {Function} get_err - Returns the Result's error value or undefined
 *                                if there is no error.
 * @property {Function} get_ok - Returns the Result's ok value or undefined if
 *                               there is no ok value.
 * @property {Function} is_err - Returns true if the result represents an error.
 * @property {Function} and_then - Takes a callback which is executed if this
 *                                 result is not an error. If the callback has
 *                                 no return then "this" is returned, otherwise
 *                                 the callback's return is returned by
 *                                 and_then.
 * @property {Function} or_else - Takes a callback which is executed if this
 *                                result is an error. If the callback has no
 *                                return then "this" is returned, otherwise
 *                                the callback's return is returned by or_else.
 **/

/**
 * Creates a result representing success using the provided value for
 * the success value.
 * @param {Object} ok - Value indicating successful computation.
 * @return {@type Result}
 **/
module.exports.Ok = function(ok) {
  var my_ok = ok;

  return {
    get_err  : function() { return undefined; },
    get_ok   : function() { return my_ok; },
    is_err   : function() { return false; },
    or_else  : function() { return this; },
    and_then : function(cb) {
      return cb(my_ok) || this;
    }
  };
};

/**
 * Creates result representing an Error using the provided value for the
 * error value.
 * @param {Object} err - Value indicating unsuccessful computation.
 * @return {@type Result}
 **/
module.exports.Err = function(err) {
  var my_err = err;

  return {
    get_err  : function() { return my_err; },
    get_ok   : function() { return undefined; },
    is_err   : function() { return true; },
    and_then : function() { return this; },
    or_else  : function(cb) {
      return cb(my_err) || this;
    }
  };
};

