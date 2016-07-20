let container = Symbol();
let enforcer  = Symbol();

class Inverter {

  constructor(enforcerInit) {

    if(enforcerInit != enforcer)
      throw new Error("Inverter is a singleton class, you can't instance it.");

    this.repository = Object.create(null);
  }

  RegisterType (name, implementation) {

      if(this.repository[name])
        throw new Error(`There's already an instance registred with the name ${name} in the container.`);

      this.repository[name] = implementation;
  }

  resolve (name, scope) {
    var implementation = this.repository[name];

    if(implementation instanceof scope)
      return implementation;

    throw new Error(`The registred member: ${name} is not an instance of the expected scope.`);
  }

  static get instance() {
    if(!this[container]) {
      this[container] = new Inverter(enforcer);
    }
    return this[container];
  }
}

export default Inverter;
