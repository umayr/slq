## `slq`
>Perform simple logical query over an object

### Install

Install it via npm:
```
  λ npm install --save slq
```

### Usage

```javascript
  const Slq = require('slq');
  const src = new Slq({
    foo: true,
    bar: false,
    baz: false
  });
  
  src.query('foo AND bar') // false
  src.query('(foo AND bar) AND baz') // false
  src.query('foo AND (bar AND baz)') // false
  src.query('foo AND (foo AND (bar AND baz))') // false
  src.query('foo AND (foo AND foo)') // true
  src.query('foo AND (foo OR bar)') // true
  src.query('foo OR (foo AND bar)') // true
  src.query('baz OR (foo AND (foo OR (foo AND (bar OR (foo AND (baz OR foo))))))') // true
```

### License
[MIT](https://github.com/umayr/slq/blob/master/LICENSE)
