/**
 * Created by Umayr Shahid on 4/28/16.
 */

'use strict';

const ParenthesisRegex = /\([^()"]*(?:"[^"]*"[^()"]*)*\)/;
const Dictionary = Object.freeze({
  'AND': '&&',
  'OR': '||'
});

const evaluate = require('safe-eval');

class Slq {
  constructor(target) {
    this.target = target;
  }

  query(q) {
    let matches = q.match(ParenthesisRegex);

    if (!matches) {
      return this.evaluate(q);
    }

    matches.forEach(match => {
      let result = this.evaluate(match);
      q = q.replace(match, result);
    });

    return this.query(q);
  }

  substitute(value) {
    if (value === 'true' || value === 'false') return value;

    return this.target[value];
  }

  trim(value) {
    value = String(value).trim();

    if (value.indexOf('(') > -1) value = value.slice(1);
    if (value.indexOf(')') > -1) value = value.slice(0, -1);

    return value;
  }

  evaluate(value) {
    value = this.trim(value);

    let parts = value.split(' ');
    let operator = Dictionary[parts[1]];

    let expression = this.substitute(parts[0]) + operator + this.substitute(parts[2]);

    return evaluate(expression);
  }
}

module.exports = Slq;
