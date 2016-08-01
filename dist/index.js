// Exporting the module.
var es6 = require('../src/inverter');
var es5 = require('../distribution/inverter');

module.exports = {
    inverterES6 = es6,
    inverter = es5,
};
