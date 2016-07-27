// Exporting the module.
var inverter = require('./inverter');

inverter.RegisterType("a", function() {

    this.log = function() {
        console.log('dependencia aaaaaaaa');
    };

    return {
        log: this.log
    };
});
inverter.RegisterType("instance", function(a) {

  //  console.log(a);

    //a.log();

    return {
        leiba: 'samba leiba'
    };

}, true);


console.log(inverter.CheckClass(function () {

}));
