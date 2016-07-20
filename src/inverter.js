let container = Symbol();
let enforcer  = Symbol();

class Inverter {

  constructor(enforcerInit) {

    if(enforcerInit != enforcer)
      throw new Error("Inverter is a singleton class, you can't create another instance.");

    this.repository = Object.create(null);
  }

  RegisterType (name, implementation) {
    //TODO: tratar para impedir ovveride de registro dar exceptipn
      this.repository[name] = implementation;
  }

  resolve (name, scope) {
    var implementation = this.repository[name];

    if(implementation instanceof scope)
      return implementation;

    throw new Error(`The registred member: ${name} is not an instance of the expected scope`);
  }

  static get instance() {
    if(!this[container]) {
      this[container] = new Inverter(enforcer);
    }
    return this[container];
  }
}

export default Inverter;
