"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var container = Symbol();
var enforcer = Symbol();

var Inverter = function () {
    function Inverter(enforcerInit) {
        _classCallCheck(this, Inverter);

        if (enforcerInit != enforcer) throw new Error("Inverter is a singleton class, you can't instance it.");

        this.repository = Object.create({});
    }

    _createClass(Inverter, [{
        key: "register",
        value: function register(name, implementation, options) {

            if (name === undefined || implementation === undefined) throw new Error("The name and the implementation are required.");

            if (this.repository.hasOwnProperty(name)) throw new Error("There's already an instance registred with the name " + name + " in the container.");

            options = options || {};

            var dependencies = this.getDependencies(implementation);
            var requirements = this.getInstances(dependencies);
            var resolved = this.dispatch(implementation, requirements);

            if (options.log) {
                console.log(dependencies);
                console.log(requirements);
                console.log(resolved);
            }

            this.repository[name] = resolved;
        }
    }, {
        key: "resolve",
        value: function resolve(name, scope) {

            if (name === undefined) throw new Error("The name and are required.");

            var implementation = this.loadFromRepository(name);

            if (scope !== undefined && !(implementation instanceof scope)) throw new Error("The registred member: " + name + " is not an instance of the expected scope.");

            return implementation;
        }
    }, {
        key: "getDependencies",
        value: function getDependencies(func) {

            if (typeof func !== "function") return [];

            var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
            var ARGUMENT_NAMES = /([^\s,]+)/g;

            var fnStr = func.toString().replace(STRIP_COMMENTS, '');
            var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

            if (result === null) result = [];

            return result;
        }
    }, {
        key: "getInstances",
        value: function getInstances(names) {
            var _this = this;

            var instances = [];

            names.forEach(function (name) {
                instances.push(_this.loadFromRepository(name, true));
            });

            return instances;
        }
    }, {
        key: "loadFromRepository",
        value: function loadFromRepository(name, dependency) {

            if (!this.repository.hasOwnProperty(name)) throw new Error(dependency ? "The dependency " + name + " was not previously registred" : "Theres no instances registred with the name " + name);

            return this.repository[name];
        }
    }, {
        key: "dispatch",
        value: function dispatch(fn, args) {

            if (typeof fn !== "function") return fn;

            if (this.CheckClass(fn)) return new (Function.prototype.bind.apply(fn, args))();
            // return fn.apply(this, args || []);
            return fn.apply(undefined, _toConsumableArray(args));
        }
    }, {
        key: "CheckClass",
        value: function CheckClass(func) {
            return typeof func === 'function' && /^class\s/.test(Function.prototype.toString.call(func));
        }
    }], [{
        key: "instance",
        get: function get() {

            if (!this[container]) this[container] = new Inverter(enforcer);

            return this[container];
        }
    }]);

    return Inverter;
}();

module.exports = Inverter.instance;