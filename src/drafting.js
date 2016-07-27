// Exporting the module.
var inverter = require('./inverter');

inverter.RegisterType('Constants', function() {
  this.pi = 3.14159;
  return this;
});

inverter.RegisterType('Circle', function(Constants) {
    this.area = function(radius) {
        return Constants.pi * radius * radius;
    };
    this.getPi = function () {
      return Constants.pi;
    }
    return this;
});
var circle = inverter.resolve('Circle');

console.log(circle.area(2));
console.log(circle.getPi());
