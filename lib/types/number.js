'use strict';

var SchemaType = require('../schematype');
var util = require('../util');
var ValidationError = require('../error/validation');

/**
 * Number schema type.
 *
 * @class SchemaTypeNumber
 * @param {String} name
 * @param {Object} options
 *   @param {Boolean} [options.required=false]
 *   @param {Number|Function} [options.default]
 * @constructor
 * @extends {SchemaType}
 * @module warehouse
 */
function SchemaTypeNumber(name, options){
  SchemaType.call(this, name, options);
}

util.inherits(SchemaTypeNumber, SchemaType);

/**
 * Casts a number.
 *
 * @method cast
 * @param {*} value
 * @param {Object} data
 * @return {Number}
 */
SchemaTypeNumber.prototype.cast = function(value_, data){
  var value = SchemaType.prototype.cast.call(this, value_, data);

  if (value == null || typeof value === 'number') return value;

  return +value;
};

/**
 * Validates a number.
 *
 * @method validate
 * @param {*} value
 * @param {Object} data
 * @return {Number|Error}
 */
SchemaTypeNumber.prototype.validate = function(value_, data){
  var value = SchemaType.prototype.validate.call(this, value_, data);
  if (value instanceof Error) return value;

  if (value !== undefined && (typeof value !== 'number' || isNaN(value))){
    return new ValidationError('`' + value + '` is not a number!');
  }

  return value;
};

/**
 * Adds value to a number.
 *
 * @method u$inc
 * @param {Number} value
 * @param {Number} update
 * @param {Object} data
 * @return {Number}
 */
SchemaTypeNumber.prototype.u$inc = function(value, update, data){
  return value ? value + update : update;
};

/**
 * Subtracts value from a number.
 *
 * @method u$dec
 * @param {Number} value
 * @param {Number} update
 * @param {Object} data
 * @return {Number}
 */
SchemaTypeNumber.prototype.u$dec = function(value, update, data){
  return value ? value - update : -update;
};

/**
 * Multiplies value to a number.
 *
 * @method u$mul
 * @param {Number} value
 * @param {Number} update
 * @param {Object} data
 * @return {Number}
 */
SchemaTypeNumber.prototype.u$mul = function(value, update, data){
  return value ? value * update : 0;
};

/**
 * Divides a number by a value.
 *
 * @method u$div
 * @param {Number} value
 * @param {Number} update
 * @param {Object} data
 * @return {Number}
 */
SchemaTypeNumber.prototype.u$div = function(value, update, data){
  return value ? value / update : 0;
};

/**
 * Divides a number by a value and returns the remainder.
 *
 * @method u$mod
 * @param {Number} value
 * @param {Number} update
 * @param {Object} data
 * @return {Number}
 */
SchemaTypeNumber.prototype.u$mod = function(value, update, data){
  return value ? value % update : 0;
};

/**
 * Updates a number if the value is greater than the current value.
 *
 * @method u$max
 * @param {Number} value
 * @param {Number} update
 * @param {Object} data
 * @return {Number}
 */
SchemaTypeNumber.prototype.u$max = function(value, update, data){
  return update > value ? update : value;
};

/**
 * Updates a number if the value is less than the current value.
 *
 * @method u$min
 * @param {Number} value
 * @param {Number} update
 * @param {Object} data
 * @return {Number}
 */
SchemaTypeNumber.prototype.u$min = function(value, update, data){
  return update < value ? update : value;
};

module.exports = SchemaTypeNumber;