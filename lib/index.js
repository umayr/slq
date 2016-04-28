/**
 * Created by Umayr Shahid <umayrr@hotmail.co.uk> on 28th April 2016.
 */

'use strict';

const Dictionary = Object.freeze({
  'AND': '&&',
  'OR': '||',
  'NOT': '!'
});

const evaluate = require('safe-eval');

const substitute = {
  'object': function handleObject(src, text) {
    let keys = Object.keys(src);
    if (keys.length < 1) throw new Error('slq: target object should not be empty');
    keys.forEach(key => text = text.split(key).join(src[key]));

    return text;
  },
  'array': function handleArray(src, text) {
    if (src.length < 1) throw new Error('slq: target array should not be empty');
    text
      .split(/[^\w\s]/gi)
      .join('')
      .trim()
      .replace(/  +/g, ' ')
      .split(' ')
      .forEach(item => text = text.split(item).join(String(src.indexOf(item) > -1)));
    return text;
  }
};

class Slq {
  constructor(target) {
    this.target = target;
    this.type = !Array.isArray(target) ? (this.target === Object(this.target) ? 'object' : null) : 'array';

    if (!this.type) throw new Error('slq: target should be either object or an array');
  }

  query(q) {
    if (q === void 0 || q === '') throw new Error('slq: query should not be empty');
    q = substitute[typeof Dictionary](Dictionary, q);
    q = substitute[this.type](this.target, q);
    try {
      return evaluate(q);
    } catch (e) {
      if (e.message === 'Unexpected identifier') throw new Error('slq: invalid operator/key');
      throw new Error('slq: illegal expression');
    }

  }
}

module.exports = Slq;
