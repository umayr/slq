## `SLQ` [![Build Status](https://travis-ci.org/umayr/slq.svg?branch=master)](https://travis-ci.org/umayr/slq)
>Perform multi-level logical operations as a query over javascript object and/or array.

### Install
```
  λ npm install --save slq
```

### Usage
```javascript
  // require the library
  const SLQ = require('slq');
  // instantiate class object with either an object or an array
  // for objects, it places the value for every key in the expression to evaluate
  // valid existent key should be provided in the query
  // for example, create instance with an object:
  let src = new SLQ({
    foo: true,
    bar: false,
    baz: false
  });
  // and, go wild
  src.query('foo AND bar'); // false
  src.query('foo AND NOT bar'); // true
  src.query('NOT (foo AND NOT bar)'); // false
  src.query('(foo AND bar) AND baz'); // false
  src.query('NOT(NOT((foo AND bar) AND baz))'); // false
  src.query('foo AND (bar AND baz)'); // false
  src.query('foo AND (foo AND (bar AND baz))'); // false
  src.query('foo AND (foo AND foo)'); // true
  src.query('foo AND (foo OR bar)'); // true
  src.query('foo OR (foo AND bar)'); // true
  src.query('baz OR (foo AND (foo OR (foo AND (bar OR (foo AND (baz OR foo))))))'); // true
  // there's no limit to how deep you want to go
  src.query('NOT baz AND (foo AND (foo OR (foo AND (bar OR (foo AND (baz OR foo))))))'); // true
  
  // for arrays, it checks if provided key is in the array or not
  // for example:
  let src = new SLQ(['foo', 'bar', 'unicorn']);
  
  src.query('foo AND bar AND unicorn'); // true
  src.query('NOT(foo AND bar AND unicorn)'); // false
  src.query('NOT(poo OR meh AND lol)'); // true
  src.query('(NOT(NOT(yes))) OR NOT(foo AND unicorn)'); // false
  src.query('(NOT(NOT(unicorn))) OR NOT(meh AND unicorn)'); // true
```

### License
[MIT](https://github.com/umayr/slq/blob/master/LICENSE)
