/**
 * Contains methods for manipulating and using Result objects
 * which represent either a success (Ok) or failure (Err) for
 * an operation.
 * @module object-result
 **/

var createOkResult = function(ok) {
  var my_ok = ok;

  return {
    /** Returns err value or undefined */
    get_err  : function() { return undefined; },

    /** Returns ok value or undefined  */
    get_ok   : function() { return my_ok; },

    /** True if this represents an error */
    is_err   : function() { return false; },

    /** Execute callback if this is an error */
    or_else  : function() { return this; },

    /** Execute callback if this is an ok */
    and_then : function(cb) {
      return cb(my_ok) || this;
    }
  };
};

var createErrResult = function(err) {
  var my_err = err;

  return {
    /** Returns err value or undefined */
    get_err  : function() { return my_err; },

    /** Returns ok value or undefined */
    get_ok   : function() { return undefined; },

    /** True if this represents an error */
    is_err   : function() { return true; },

    /** Execute callback if this is an ok */
    and_then : function() { return this; },

    /** Execute callback if this is an error */
    or_else  : function(cb) {
      return cb(my_err) || this;
    }
  };
};

module.exports.Ok  = createOkResult;
module.exports.Err = createErrResult;
