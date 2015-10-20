/**
 * This module exposes factory functions for creating result objects
 * representing errors and successes.
 * @module object-result
 **/
'use strict';

/**
 * @class Result
 **/
let Result = {};


Result.prototype = {
  /** @lends Result **/

  /**
   * Retrieves the result's error object.
   * @return {Object} Undefined is returned if this result isn't an error.
   **/
  get_err : function() { return this.err; },

  /**
   * Retrieves the result's ok object.
   * @return {Object} Undefined is returned if this result isn't an ok.
   **/
  get_ok  : function() { return this.ok; },

  /**
   * Returns true when this result is an err.
   * @return {boolean} true if this result represents an error.
   **/
  is_err  : function() { return (this.err !== undefined); },

  /**
   * Returns true when this result is an ok.
   * @return {boolean} true if this result represents an ok.
   **/
  is_ok   : function() { return (this.ok !== undefined); },

  /**
   * Executes the provided function iff this result is not an err.
   * @param {Function} fun - A callback which takes the ok value of
   *                         this result.
   * @return {Object} If fun is executed, then its return is returned
   *                  from and_then -- otherwise "this" is returned.
   **/
  and_then : function(fun) {
    if (this.is_ok()) {
      return fun(this.get_ok()) || this;
    }

    return this;
  },

  /**
   * Executes the provided function iff this result is an err.
   * @param {Function} fun - A callback which takes the err value of
   *                         this result.
   * @return {Object} If fun is executed then its return is returned
   *                  from or_else -- otherwise "this" is returned.
   **/
  or_else : function(fun) {
    if (this.is_err()) {
      return fun(this.get_err()) || this;
    }

    return this;
  },

  /**
   * Maps an ok value to a new ok value.
   * @param {Function} fun - A callback which accpts the ok value and
   *                         returns a new value to be used in the ok.
   * @return {Result} An ok result with the payload created by the
   *                  provided callback.
   **/
  map : function(fun) {
    if (this.is_ok()) {
      this.ok = fun(this.ok);
    }
    return this;
  },

  /**
   * Maps an err value to a new err value.
   * @param {Function} fun - A callback which accepts the err value and
   *                         returns a new value to be used in the err.
   * @return {Result} An err result with the err created by the provided
   *                  callback.
   **/
  map_err : function(fun) {
    if (this.is_err()) {
      this.err = fun(this.err);
    }
    return this;
  },
};

/**
 * Creates a new result object which represents an error.
 * @param {Object} error - Some object which you use to represent your error.
 * @return {Result} A result representing an error.
 **/
module.exports.createErr = function(error) {
  return {
    __proto__ : Result.prototype,
    err     : error,
  };
};

/**
 * Creates a new result object which represents a success.
 * @param {Object} ok - Some object which you use to represent your success.
 * @return {Result} A result representing a success.
 **/
module.exports.createOk = function(ok) {
  return {
    __proto__ : Result.prototype,
    ok      : ok,
  };
};
