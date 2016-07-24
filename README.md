# inverter-ioc
Just a fast, tiny and useful IoC Container

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  [![Linux Build][travis-image]][travis-url]
  [![Coverage][coverage-image]][coverage-url]

## Installation

```bash
$ npm install inverter-ioc
```

## Quick Start

```js
// Importing the module.
let inverter = import('inverter-ioc');
// Creating an instance of a class called 'YourClassName'-
let registredInstance = new YourClassName();
// Registering the current instance for future use.
inverter.RegisterType("registerName", registredInstance);
// Calling a previously created instance.
let resolvedInstance    =   inverter.resolve("registerName", YourClassName);
```

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## Features

  * Upcoming

## License

  [GNU GENERAL PUBLIC LICENSE](LICENSE)

[npm-image]: https://img.shields.io/npm/v/inverter-ioc.svg
[npm-url]: https://npmjs.org/package/inverter-ioc
[downloads-image]: https://img.shields.io/npm/dm/inverter-ioc.svg
[downloads-url]: https://npmjs.org/package/inverter-ioc
[coverage-url]: https://coveralls.io/github/felipeuntill/inverter-ioc?branch=master
[travis-image]: https://travis-ci.org/felipeuntill/inverter-ioc.svg
[coverage-image]: https://coveralls.io/repos/github/felipeuntill/inverter-ioc/badge.svg?branch=master
[travis-url]: https://travis-ci.org/felipeuntill/inverter-ioc
