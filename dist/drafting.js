'use strict';

// Exporting the module.
var inverter = require('./inverter');

inverter.register('Constants', function () {
  return { pi: 3.14159 };
});

inverter.register('Circle', function (Constants) {
  this.area = function (radius) {
    return Constants.pi * radius * radius;
  };
  this.getPi = function () {
    return Constants.pi;
  };
  return this;
});
var circle = inverter.resolve('Circle');
var constants = inverter.resolve('Constants');

console.log(constants);
console.log(circle.area(2));
console.log(circle.getPi());