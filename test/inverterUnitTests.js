var expect = require("chai").expect;
var inverter = require("../src/inverter");
var testClasses = require("./testClasses");

describe("Inverter IoC - Unit Tests", function() {

    describe("Granting Singleton Functionality", function() {

        it("can't be initialized", function() {
            let test = "cant_be_initialized";
            expect(() => {
                let fall = new inverter();
            }).to.throw(Error);
        });

        it("can't be initialized with Symbol", function() {
            let test = "cant_be_initialized_with_symbol";
            expect(() => {
                let fall = new inverter(new Symbol());
            }).to.throw(Error);
        });

    });

    describe("Registering Instances", function() {

        it("can just register an instance", function() {
            let test = "can_just_register_an_instance";
            expect(() => {
                inverter.RegisterType(test, testClasses.SimpleClass);
            }).to.not.throw(Error);
        });

        it("can register an instance and get it", function() {
            let test = "can_register_an_instance_and_get_it";
            inverter.RegisterType(test, testClasses.SimpleClass);
            let resolvedInstance = inverter.resolve(test, testClasses.SimpleClass);
            expect(resolvedInstance instanceof testClasses.SimpleClass).to.be.true;
        });

        it("throw an exception if some arguments is missing", function() {
            let test = "throw_an_exception_if_some_arguments_is_missing";
            expect(() => {
                inverter.RegisterType();
            }).to.throw(Error);
        });

        it("throw an exception if theres already an instance using the register name", function() {
            let test = "throw_an_exception_if_theres_already_an_instance_using_the_register_name";
            expect(() => {
                inverter.RegisterType(test, testClasses.SimpleClass);
                inverter.RegisterType(test, testClasses.SimpleClassTwo);
            }).to.throw(Error);
        });

    });

    describe("Resolving Instances", function() {

        it("throw an exception if the instance was not registred", function() {
            let test = "throw_an_exception_if_the_instance_was_not_registred";
            inverter.RegisterType(test, testClasses.SimpleClass);
            expect(() => {
                let resolvedInstance = inverter.resolve(`${test}Exception`, testClasses.SimpleClassTwo);
            }).to.throw(Error);
        });

        it("throw an exception if the type of the instance was diferente than expected", function() {
            let test = "throw_an_exception_if_the_type_of_the_instance_was_diferente_than_expected";
            inverter.RegisterType(test, testClasses.SimpleClass);
            expect(() => {
                let resolvedInstance = inverter.resolve(test, testClasses.SimpleClassTwo);
            }).to.throw(Error);
        });

        it("throw an exception if the instance was not previously registred", function() {
            let test = "throw_an_exception_if_the_instance_was_not_previously_registred";
            expect(() => {
                let resolvedInstance = inverter.resolve(test, testClasses.SimpleClassTwo);
            }).to.throw(Error);
        });

        it("throw an exception if some arguments is missing", function() {
            let test = "throw_an_exception_if_some_arguments_is_missing";
            inverter.RegisterType(test, testClasses.SimpleClass);
            expect(() => {
                let resolvedInstance = inverter.resolve();
            }).to.throw(Error);
        });

    });

});
