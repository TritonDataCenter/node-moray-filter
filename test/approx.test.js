// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2015 Patrick Mooney
// Copyright 2016 Joyent, Inc.

var test = require('tape').test;


///--- Globals

var ApproximateFilter;


///--- Tests

test('load library', function (t) {
  var filters = require('../lib/index');
  t.ok(filters);
  ApproximateFilter = filters.ApproximateFilter;
  t.ok(ApproximateFilter);
  t.end();
});


test('Construct no args', function (t) {
  var f = new ApproximateFilter();
  t.ok(f);
  t.ok(!f.attribute);
  t.ok(!f.value);
  t.end();
});


test('Construct args', function (t) {
  var f = new ApproximateFilter({
    attribute: 'foo',
    value: 'bar'
  });
  t.ok(f);
  t.equal(f.attribute, 'foo');
  t.equal(f.value, 'bar');
  t.equal(f.toString(), '(foo~=bar)');
  t.deepEqual(f.json, {
    type: 'ApproximateMatch',
    attribute: 'foo',
    value: 'bar'
  });
  t.end();
});


test('escape value only in toString()', function (t) {
  var f = new ApproximateFilter({
    attribute: 'foo',
    value: 'ba(r)'
  });
  t.ok(f);
  t.equal(f.attribute, 'foo');
  t.equal(f.value, 'ba(r)');
  t.equal(f.toString(), '(foo~=ba\\(r\\))');
  t.end();
});


test('matches throws', function (t) {
  t.plan(1);
  var f = new ApproximateFilter();
  try {
    f.matches({});
  } catch (err) {
    t.ok(err);
  }
});
