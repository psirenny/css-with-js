// @flow

import test from 'ava';
import { unicodeRangesToCssStr } from '../src';

test('_', (t) => {
  const ranges = [];
  const actual = unicodeRangesToCssStr()(ranges);
  const expected = undefined;
  t.is(actual, expected);
});

test('*', (t) => {
  const ranges = [{ from: 0, to: Infinity }];
  const actual = unicodeRangesToCssStr()(ranges);
  const expected = null;
  t.is(actual, expected);
});

test('u', (t) => {
  const ranges = [{ from: 48, to: 48 }];
  const actual = unicodeRangesToCssStr()(ranges);
  const expected = 'u+30';
  t.deepEqual(actual, expected);
});

test('U', (t) => {
  const ranges = [{ from: 48, to: 48 }];
  const actual = unicodeRangesToCssStr({ upper: true })(ranges);
  const expected = 'U+30';
  t.deepEqual(actual, expected);
});

test('u,u', (t) => {
  const ranges = [{ from: 48, to: 48 }, { from: 50, to: 50 }];
  const actual = unicodeRangesToCssStr()(ranges);
  const expected = 'u+30,u+32';
  t.deepEqual(actual, expected);
});

test('u, u', (t) => {
  const ranges = [{ from: 48, to: 48 }, { from: 50, to: 50 }];
  const actual = unicodeRangesToCssStr({ space: true })(ranges);
  const expected = 'u+30, u+32';
  t.deepEqual(actual, expected);
});

test('u-v', (t) => {
  const ranges = [{ from: 48, to: 50 }];
  const actual = unicodeRangesToCssStr()(ranges);
  const expected = 'u+30-32';
  t.deepEqual(actual, expected);
});

test('u,u-v,u,u-v', (t) => {
  const ranges = [{ from: 32, to: 32 }, { from: 48, to: 50 }, { from: 61, to: 61 }, { from: 97, to: 99 }];
  const actual = unicodeRangesToCssStr()(ranges);
  const expected = 'u+20,u+30-32,u+3d,u+61-63';
  t.deepEqual(actual, expected);
});

test('u?', (t) => {
  const ranges = [{ from: 48, to: 63 }];
  const actual = unicodeRangesToCssStr()(ranges);
  const expected = 'u+3?';
  t.deepEqual(actual, expected);
});

test('u??', (t) => {
  const ranges = [{ from: 0, to: 4095 }];
  const actual = unicodeRangesToCssStr()(ranges);
  const expected = 'u+???';
  t.deepEqual(actual, expected);
});
