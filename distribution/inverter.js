'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
        key: 'RegisterType',
        value: function RegisterType(name, implementation) {

            if (name === undefined || implementation === undefined) throw new Error('The name and the implementation are required.');

            if (this.repository.hasOwnProperty(name)) throw new Error('There\'s already an instance registred with the name ' + name + ' in the container.');

            var dependencies = this.getDependencies(implementation);
            var requirements = this.getInstances(dependencies);
            var resolved = this.dispatch(implementation, requirements);

            this.repository[name] = resolved;
        }
    }, {
        key: 'resolve',
        value: function resolve(name, scope) {

            if (name === undefined || scope === undefined) throw new Error('The name and the scope are required.');

            var implementation = this.loadFromRepository(name);

            if (!(implementation instanceof scope)) throw new Error('The registred member: ' + name + ' is not an instance of the expected scope.');

            return implementation;
        }
    }, {
        key: 'getDependencies',
        value: function getDependencies(func) {

            var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
            var ARGUMENT_NAMES = /([^\s,]+)/g;

            var fnStr = func.toString().replace(STRIP_COMMENTS, '');
            var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

            if (result === null) result = [];

            return result;
        }
    }, {
        key: 'getInstances',
        value: function getInstances(names) {
            var _this = this;

            var instances = [];

            names.forEach(function (name) {
                instances.push(_this.loadFromRepository(name, true));
            });

            return instances;
        }
    }, {
        key: 'loadFromRepository',
        value: function loadFromRepository(name, dependency) {

            if (!this.repository.hasOwnProperty(name)) throw new Error(dependency ? 'The dependency ' + name + ' was not previously registred' : 'Theres no instances registred with the name ' + name);

            return this.repository[name];
        }
    }, {
        key: 'dispatch',
        value: function dispatch(fn, args) {

            if (typeof fn !== "function") throw new Error('The dispath method requires a function');

            return new (Function.prototype.bind.apply(fn, args))();
        }
    }], [{
        key: 'instance',
        get: function get() {

            if (!this[container]) this[container] = new Inverter(enforcer);

            return this[container];
        }
    }]);

    return Inverter;
}();

module.exports = Inverter.instance;