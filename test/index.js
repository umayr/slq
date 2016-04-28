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
      expect(src.query('foo AND bar', false)).to.be.false;
    });

    it('should be false when `(foo AND bar) AND baz`', () => {
      expect(src.query('(foo AND bar) AND baz', false)).to.be.false;
    });

    it('should be false when `foo AND (bar AND baz)`', () => {
      expect(src.query('foo AND (bar AND baz)', false)).to.be.false;
    });

    it('should be false when `foo AND (foo AND (bar AND baz))`', () => {
      expect(src.query('foo AND (foo AND (bar AND baz))', false)).to.be.false;
    });

    it('should be true when `foo AND (foo AND foo)`', () => {
      expect(src.query('foo AND (foo AND foo)', true)).to.be.true;
    });

    it('should be true when `foo AND (foo OR bar)`', () => {
      expect(src.query('foo AND (foo OR bar)', true)).to.be.true;
    });

    it('should be true when `foo OR (foo AND bar)`', () => {
      expect(src.query('foo OR (foo AND bar)', true)).to.be.true;
    });

    it('should be true when `baz OR (foo AND (foo OR (foo AND (bar OR (foo AND (baz OR foo))))))`', () => {
      expect(src.query('baz OR (foo AND (foo OR (foo AND (bar OR (foo AND (baz OR foo))))))', true)).to.be.true;
    });
  });
});
