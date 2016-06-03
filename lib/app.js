'use strict';

const Slq = require('./index');

let src = new Slq({
  ViewPMOReports: true
});

console.log(src.query('ViewPMOReports'));
