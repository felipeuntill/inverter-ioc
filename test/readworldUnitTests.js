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
            console.log(constants);
            var pi  = constants().pi;
            expect(pi).to.equal(3.14159);
        });

    });

});
