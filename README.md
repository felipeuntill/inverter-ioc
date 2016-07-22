# inverter-ioc
Just a fast, tiny and useful IoC Container




  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]
  [![Linux Build][travis-image]][travis-url]
  [![Coverage][coverage-image]][coverage-url]

## Installation

```bash
$ npm install optionextender
```

## Quick Start

```js
var optionExtender = require('optionextender')

var previsouly = { 
    name : 'previously name'  
};
var replace = {  
    name : 'replaced name' 
};

console.log(optionExtender(previsouly, replace));
// { name : 'replaced name'}
```

## Tests

  To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## Features

  * Properties substitution

## People

The author of optionextender is [Felipe Assunção](https://github.com/felipeuntill)

## License

  [GNU GENERAL PUBLIC LICENSE](LICENSE)

[npm-image]: https://img.shields.io/npm/v/optionextender.svg
[npm-url]: https://npmjs.org/package/optionextender
[downloads-image]: https://img.shields.io/npm/dm/optionextender.svg
[downloads-url]: https://npmjs.org/package/optionextender
[coverage-url]: https://coveralls.io/github/felipeuntill/inverter-ioc?branch=master
[travis-image]: https://travis-ci.org/felipeuntill/optionExtender.svg
[coverage-image]: https://coveralls.io/repos/github/felipeuntill/inverter-ioc/badge.svg?branch=master
[travis-url]: https://travis-ci.org/felipeuntill/optionExtender
