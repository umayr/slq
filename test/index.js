/**
 * Created by Umayr Shahid <umayrr@hotmail.co.uk> on 28th April 2016.
 */

'use strict';

const expect = require('chai').expect;

describe('slq', () => {
  const Slq = require('../lib');

  describe('#query', () => {
    it('should throw exception if invalid operator is provided', () => {
      let s = new Slq({foo: true});

      expect(s.query.bind(s, 'baz LOL foo')).to.throw(Error);
      expect(s.query.bind(s, 'baz LOL foo')).to.throw(/slq: invalid operator\/key/);
    });

    it('should throw exception if no query is provided', () => {
      let s = new Slq({foo: true});

      expect(s.query.bind(s, '')).to.throw(Error);
      expect(s.query.bind(s, '')).to.throw(/slq: query should not be empty/);
      expect(s.query.bind(s)).to.throw(Error);
      expect(s.query.bind(s)).to.throw(/slq: query should not be empty/);
    });

    it('should throw exception if provided with empty target object', () => {
      let s = new Slq({});

      expect(s.query.bind(s, 'lol AND lmao')).to.throw(Error);
      expect(s.query.bind(s, 'lol AND lmao')).to.throw(/slq: target object should not be empty/);
    });

    it('should throw exception if not provided with either object or array', () => {
      function fn() {
        new Slq('')
      }

      expect(fn).to.throw(Error);
      expect(fn).to.throw(/slq: target should be either object or an array/);
    });

    it('should throw exception if provided illegal expression', () => {
      let s = new Slq({foo: true});

      expect(s.query.bind(s, 'lol 2132312 !! asdasmmAAA lmao')).to.throw(Error);
      expect(s.query.bind(s, 'lol AND lmao')).to.throw(/slq: illegal expression/);
    });

    it('should be not work when provided with non-existent keys', () => {
      let s = new Slq({foo: true});
      expect(s.query.bind(s, 'NOT (unicorn AND NOT bar)')).to.throw(Error);
    });

    describe('#object', () => {

      let src = new Slq({
        foo: true,
        bar: false,
        baz: false
      });

      it('should be false when `foo AND bar`', () => {
        expect(src.query('foo AND bar')).to.be.false;
      });

      it('should be true when `foo AND NOT bar`', () => {
        expect(src.query('foo AND NOT bar')).to.be.true;
      });

      it('should be false when `NOT (foo AND NOT bar)`', () => {
        expect(src.query('NOT (foo AND NOT bar)')).to.be.false;
      });

      it('should be false when `(foo AND bar) AND baz`', () => {
        expect(src.query('(foo AND bar) AND baz')).to.be.false;
      });

      it('should be false when `NOT(NOT((foo AND bar) AND baz))`', () => {
        expect(src.query('NOT(NOT((foo AND bar) AND baz))')).to.be.false;
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

      it('should be true when `NOT baz AND (foo AND (foo OR (foo AND (bar OR (foo AND (baz OR foo))))))`', () => {
        expect(src.query('NOT baz AND (foo AND (foo OR (foo AND (bar OR (foo AND (baz OR foo))))))')).to.be.true;
      });
    });

    describe('#array', () => {
      let src = new Slq(['foo', 'bar', 'unicorn']);

      it('should be true when `foo AND bar AND unicorn`', () => {
        expect(src.query('foo AND bar AND unicorn')).to.be.true;
      });

      it('should be true when `foo AND bar AND unicorn` and a LOT of spaces & tabs', () => {
        expect(src.query('foo         AND    bar                    AND unicorn')).to.be.true;
      });

      it('should be false when `NOT(foo AND bar AND unicorn)`', () => {
        expect(src.query('NOT(foo AND bar AND unicorn)')).to.be.false;
      });

      it('should be true when `NOT(poo OR meh AND lol)`', () => {
        expect(src.query('NOT(poo OR meh AND lol)')).to.be.true;
      });

      it('should be false when `(NOT(NOT(yes))) OR NOT(foo AND unicorn)`', () => {
        expect(src.query('(NOT(NOT(yes))) OR NOT(foo AND unicorn)')).to.be.false;
      });

      it('should be true when `(NOT(NOT(unicorn))) OR NOT(meh AND unicorn)`', () => {
        expect(src.query('(NOT(NOT(unicorn))) OR NOT(meh AND unicorn)')).to.be.true;
      });

      it('should be true when `(!(!(unicorn))) || !(meh && unicorn)` with actual operators', () => {
        expect(src.query('(!(!(unicorn))) || !(meh && unicorn)')).to.be.true;
      });
    });
  });

});
