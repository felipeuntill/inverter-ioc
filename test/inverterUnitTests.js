var expect        = require("chai").expect;
var inverter      = require("../src/inverter");
var testClasses   = require("./testClasses");

describe("Registering Instances", function() {

  it("can just register an instance", function() {
    let test = "can_just_register_an_instance";
    expect(() =>  {
      let registredInstance =  new testClasses.SimpleClass();
      inverter.RegisterType(test, registredInstance);
    }).to.not.throw(Error);
  });

  it("can register an instance and get it", function() {
      let test = "can_register_an_instance_and_get_it";
      let registredInstance   =  new testClasses.SimpleClass();
      inverter.RegisterType(test, registredInstance);
      let resolvedInstance    =   inverter.resolve(test, testClasses.SimpleClass);
      expect(registredInstance).equal(resolvedInstance);
  });

  it("throw an exception if the type of the instance was diferente than expected", function() {
      let test = "throw_an_exception_if_the_type_of_the_instance_was_diferente_than_expected";
      let registredInstance   =  new testClasses.SimpleClass();
      inverter.RegisterType(test, registredInstance);
      expect(() =>  {
        let resolvedInstance    =   inverter.resolve(test, testClasses.SimpleClassTwo);
      }).to.throw(Error);
  });

});
