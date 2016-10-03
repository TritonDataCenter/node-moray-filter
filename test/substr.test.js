// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2015 Patrick Mooney
// Copyright 2016 Joyent, Inc.

var test = require('tape').test;


///--- Globals

var SubstringFilter;


///--- Tests

test('load library', function (t) {
  var filters = require('../lib/index');
  t.ok(filters);
  SubstringFilter = filters.SubstringFilter;
  t.ok(SubstringFilter);
  t.end();
});


test('Construct no args', function (t) {
  var f = new SubstringFilter();
  t.ok(f);
  t.ok(!f.attribute);
  t.ok(!f.value);
  t.end();
});


test('Construct args', function (t) {
  var f = new SubstringFilter({
    attribute: 'foo',
    initial: 'bar',
    any: ['zig', 'zag'],
    'final': 'baz'
  });
  t.ok(f);
  t.equal(f.attribute, 'foo');
  t.equal(f.initial, 'bar');
  t.equal(f.any.length, 2);
  t.equal(f.any[0], 'zig');
  t.equal(f.any[1], 'zag');
  t.equal(f.final, 'baz');
  t.equal(f.toString(), '(foo=bar*zig*zag*baz)');
  t.deepEqual(f.json, {
    type: 'SubstringMatch',
    initial: 'bar',
    any: [ 'zig', 'zag' ],
    final: 'baz'
  });
  t.end();
});


test('escape value only in toString()', function (t) {
  var f = new SubstringFilter({
    attribute: 'fo(o',
    initial: 'ba(r)',
    any: ['zi)g', 'z(ag'],
    'final': '(baz)'
  });
  t.ok(f);
  t.equal(f.attribute, 'fo(o');
  t.equal(f.initial, 'ba(r)');
  t.equal(f.any.length, 2);
  t.equal(f.any[0], 'zi)g');
  t.equal(f.any[1], 'z(ag');
  t.equal(f.final, '(baz)');
  t.equal(f.toString(), '(fo\\(o=ba\\(r\\)*zi\\)g*z\\(ag*\\(baz\\))');
  t.end();
});


test('match true', function (t) {
  var f = new SubstringFilter({
    attribute: 'foo',
    initial: 'bar',
    any: ['zig', 'zag'],
    'final': 'baz'
  });
  t.ok(f);
  t.ok(f.matches({ foo: 'barmoozigbarzagblahbaz' }));
  t.end();
});


test('match false', function (t) {
  var f = new SubstringFilter({
    attribute: 'foo',
    initial: 'bar',
    any: ['biz', 'biz'],
    'final': 'baz'
  });
  t.ok(f);
  t.ok(!f.matches({ foo: 'bafmoozigbarzagblahbaz' }));
  t.ok(!f.matches({ baz: 'barbizbizbaz' }));
  t.end();
});


test('match any', function (t) {
  var f = new SubstringFilter({
    attribute: 'foo',
    initial: 'bar'
  });
  t.ok(f);
  t.ok(f.matches({ foo: ['beuha', 'barista']}));
  t.end();
});


test('match no-initial', function (t) {
  var f = new SubstringFilter({
    attribute: 'foo',
    any: ['foo']
  });
  t.ok(f);
  t.equal(f.toString(), '(foo=*foo*)');
  t.ok(f.matches({foo: 'foobar'}));
  t.ok(f.matches({foo: 'barfoo'}));
  t.ok(!f.matches({foo: 'bar'}));
  t.end();
});


test('escape for regex in matches', function (t) {
  var f = new SubstringFilter({
    attribute: 'fo(o',
    initial: 'ba(r)',
    any: ['zi)g', 'z(ag'],
    'final': '(baz)'
  });
  t.ok(f);
  t.ok(f.matches({ 'fo(o': ['ba(r)_zi)g-z(ag~(baz)']}));
  t.end();
});
