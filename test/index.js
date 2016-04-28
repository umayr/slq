/**
 * Created by Umayr Shahid on 4/28/16.
 */

'use strict';

const expect = require('chai').expect;

describe('slq', () => {
  const Slq = require('../lib');

  describe('#query', ()=> {

    let src = new Slq({
      foo: true,
      bar: false,
      baz: false
    });

    it('should be false when `foo AND bar`', () => {
      expect(src.query('foo AND bar')).to.be.false;
    });

    it('should be false when `(foo AND bar) AND baz`', () => {
      expect(src.query('(foo AND bar) AND baz')).to.be.false;
    });

    it('should be false when `foo AND (bar AND baz)`', () => {
      expect(src.query('foo AND (bar AND baz)')).to.be.false;
    });

    it('should be false when `foo AND (foo AND (bar AND baz))`', () => {
      expect(src.query('foo AND (foo AND (bar AND baz))')).to.be.false;
    });

    it('should be true when `foo AND (foo AND foo)`', () => {
      expect(src.query('foo AND (foo AND foo)')).to.be.true;
    });

    it('should be true when `foo AND (foo OR bar)`', () => {
      expect(src.query('foo AND (foo OR bar)')).to.be.true;
    });

    it('should be true when `foo OR (foo AND bar)`', () => {
      expect(src.query('foo OR (foo AND bar)')).to.be.true;
    });

    it('should be true when `baz OR (foo AND (foo OR (foo AND (bar OR (foo AND (baz OR foo))))))`', () => {
      expect(src.query('baz OR (foo AND (foo OR (foo AND (bar OR (foo AND (baz OR foo))))))')).to.be.true;
    });

    it('should throw error if invalid operator is provided', () => {
      expect(src.query.bind(src, 'baz LOL foo')).to.throw(Error);
      expect(src.query.bind(src, 'baz LOL foo')).to.throw(/slq: invalid operator/);
    });

    it('should throw error if no query is provided', () => {
      expect(src.query.bind(src, '')).to.throw(Error);
      expect(src.query.bind(src, '')).to.throw(/slq: query should not be empty/);
      expect(src.query.bind(src)).to.throw(Error);
      expect(src.query.bind(src)).to.throw(/slq: query should not be empty/);
    });
  });
});
