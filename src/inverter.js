let container = Symbol();
let enforcer  = Symbol();

class Inverter {

  constructor(enforcerInit) {

    if(enforcerInit != enforcer)
      throw new Error("Inverter is a singleton class, you can't instance it.");

    this.repository = Object.create({});
  }

  RegisterType (name, implementation) {

      if(name === undefined || implementation === undefined)
        throw new Error(`The name and the implementation are required.`);

      if(this.repository.hasOwnProperty(name))
        throw new Error(`There's already an instance registred with the name ${name} in the container.`);

      this.repository[name] = implementation;
  }

  resolve (name, scope) {

    if(name === undefined || scope === undefined)
      throw new Error(`The name and the scope are required.`);

    if(!this.repository.hasOwnProperty(name))
      throw new Error(`Theres no instances registred with the name ${name}`);

    var implementation = this.repository[name];

    if(!(implementation instanceof scope))
      throw new Error(`The registred member: ${name} is not an instance of the expected scope.`);

    return implementation;
  }

  static get instance() {
    if(!this[container]) {
      this[container] = new Inverter(enforcer);
    }
    return this[container];
  }
}

module.exports = Inverter.instance;
