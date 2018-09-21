// @flow

import test from 'ava';
import { charsetToUnicodeRanges } from '../src';

test('_', (t) => {
  const charset = [];
  const actual = charsetToUnicodeRanges(charset);
  const expected = [];
  t.deepEqual(actual, expected);
});

test('x', (t) => {
  const charset = ['0'];
  const actual = charsetToUnicodeRanges(charset);
  const expected = [{ from: 48, to: 48 }];
  t.deepEqual(actual, expected);
});

test('x,x', (t) => {
  const charset = ['0', '2'];
  const actual = charsetToUnicodeRanges(charset);
  const expected = [{ from: 48, to: 48 }, { from: 50, to: 50 }];
  t.deepEqual(actual, expected);
});

test('x-y', (t) => {
  const charset = ['0', '1', '2'];
  const actual = charsetToUnicodeRanges(charset);
  const expected = [{ from: 48, to: 50 }];
  t.deepEqual(actual, expected);
});

test('x,x-y,x,x-y', (t) => {
  const charset = [' ', '0', '1', '2', '=', 'a', 'b', 'c'];
  const actual = charsetToUnicodeRanges(charset);
  const expected = [{ from: 32, to: 32 }, { from: 48, to: 50 }, { from: 61, to: 61 }, { from: 97, to: 99 }];
  t.deepEqual(actual, expected);
});
