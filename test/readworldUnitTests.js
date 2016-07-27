var expect = require("chai").expect;
var inverter = require("../src/inverter");
var testClasses = require("./testClasses");

describe("Inverter IoC - Real world tests", function() {

    describe("Constants", function() {

        it("can declare a constant instance", function() {
            let test = "can_declare_a_constant_instance";
            inverter.RegisterType('Constants01', function() {
              this.pi = 3.14159;
            });
            var constants = inverter.resolve('Constants01');
            var pi  = constants.pi;
            expect(pi).to.equal(3.14159);
        });

        it("can declare a constant an use a previously instance as requirement", function() {
            let test = "can_declare_a_constant_instance";
            inverter.RegisterType('Constants', function() {
              this.pi = 3.14159;
            });
            inverter.RegisterType('Circle', function(Constants) {
                this.area = function(radius) {
                    return Constants.pi * radius * radius;
                };
            });
            var circle = inverter.resolve('Circle');
            var area  = circle.area(1);
            expect(area).to.equal(3.14159);
        });

    });

});
