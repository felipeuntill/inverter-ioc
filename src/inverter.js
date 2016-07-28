let container = Symbol();
let enforcer = Symbol();

class Inverter {

    constructor(enforcerInit) {

        if (enforcerInit != enforcer)
            throw new Error("Inverter is a singleton class, you can't instance it.");

        this.repository = Object.create({});
    }

    register(name, implementation, options) {

        if (name === undefined || implementation === undefined)
            throw new Error(`The name and the implementation are required.`);

        if (this.repository.hasOwnProperty(name))
            throw new Error(`There's already an instance registred with the name ${name} in the container.`);

        options = options || {};

        var dependencies = this.getDependencies(implementation);
        var requirements = this.getInstances(dependencies);
        var resolved     = this.dispatch(implementation, requirements);

        if(options.log) {
            console.log(dependencies);
            console.log(requirements);
            console.log(resolved);
        }

        this.repository[name] = resolved;
    }

    resolve(name, scope) {

        if (name === undefined)
            throw new Error(`The name and are required.`);

        var implementation = this.loadFromRepository(name);

        if (scope !== undefined && !(implementation instanceof scope))
            throw new Error(`The registred member: ${name} is not an instance of the expected scope.`);

        return implementation;
    }

    getDependencies(func) {

        if (typeof func !== "function")
             return [];

        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        const ARGUMENT_NAMES = /([^\s,]+)/g;

        let fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

        if (result === null) result = [];

        return result;
    }

    getInstances(names) {

        var instances = [];

        names.forEach((name) => {
            instances.push(this.loadFromRepository(name, true));
        });

        return instances;
    }

    loadFromRepository(name, dependency) {

        if (!this.repository.hasOwnProperty(name))
            throw new Error(
                dependency ?
                `The dependency ${name} was not previously registred` :
                `Theres no instances registred with the name ${name}`
            );

        return this.repository[name];
    }

    dispatch(fn, args) {

        if (typeof fn !== "function")
            return fn;

        if(this.CheckClass(fn))
            return new(Function.prototype.bind.apply(fn, args));
        // return fn.apply(this, args || []);
        return fn(...args);
    }

    CheckClass(func) {
      return typeof func === 'function'
        && /^class\s/.test(Function.prototype.toString.call(func));
    }

    static get instance() {

        if (!this[container]) this[container] = new Inverter(enforcer);

        return this[container];
    }
}

module.exports = Inverter.instance;
