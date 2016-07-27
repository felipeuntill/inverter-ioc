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


let test = "can_declare_a_constant_instance";
inverter.RegisterType('Constants', function() {
  this.pi = 3.14159;
  return this;
}, true);
var constants = inverter.resolve('Constants');

console.log(constants);
console.log(constants.pi);

//var pi  = constants.pi;
