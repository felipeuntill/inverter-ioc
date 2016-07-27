// Exporting the module.
var inverter = require('./inverter');

// inverter.RegisterType("a", function() {
//
//     this.log = function() {
//         console.log('dependencia aaaaaaaa');
//     };
//
//     return {
//         log: this.log
//     };
// });
// inverter.RegisterType("instance", function(a) {
//
//   //  console.log(a);
//
//     //a.log();
//
//     return {
//         leiba: 'samba leiba'
//     };
//
// }, true);
//
//
// console.log(inverter.CheckClass(function () {
//
// }));


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
