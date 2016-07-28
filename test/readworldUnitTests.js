var expect = require("chai").expect;
var inverter = require("../src/inverter");
var testClasses = require("./testClasses");

describe("Inverter IoC - Real world tests", function() {

    describe("Constants", function() {

        it("can declare a constant instance", function() {
            inverter.register('Constants01', function() {
              this.pi = 3.14159;
              return this;
            });
            var constants = inverter.resolve('Constants01');
            var pi  = constants.pi;
            expect(pi).to.equal(3.14159);
        });

        it("can declare a constant an use a previously instance as requirement", function() {
            inverter.register('Constants', function() {
              this.pi = 3.14159;
              return this;
            });
            inverter.register('Circle', function(Constants) {
                this.area = function(radius) {
                    return Constants.pi * radius * radius;
                };
                return this;
            });
            var circle = inverter.resolve('Circle');
            var area  = circle.area(1);
            expect(area).to.equal(3.14159);
        });

        it("can declare a constant an use a previously instance as requirement", function() {
            inverter.register('UsingInstances', function(Constants, Circle) {
                this.checkValues = function() {
                    return Constants.pi == Circle.area(1);
                };
                return this;
            });
            var using = inverter.resolve('UsingInstances');
            expect(using.checkValues()).to.equal(true);
        });

    });

});
