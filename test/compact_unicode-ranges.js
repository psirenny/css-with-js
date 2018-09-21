// @flow

import test from 'ava';
import { compactUnicodeRanges } from '../src';

test('_', (t) => {
  const exactRanges = [];
  const unusedCharset = ['3', '4', '5', '6', '7', '8', '9', ':', ';', '<'];
  const actual = compactUnicodeRanges(exactRanges, unusedCharset);
  const expected = [];
  t.deepEqual(actual, expected);
});

test('x,x…y,x-y', (t) => {
  const exactRanges = [{ from: 32, to: 32 }, { from: 48, to: 50 }, { from: 61, to: 61 }, { from: 97, to: 99 }];
  const unusedCharset = ['3', '4', '5', '6', '7', '8', '9', ':', ';', '<'];
  const actual = compactUnicodeRanges(exactRanges, unusedCharset);
  const expected = [{ from: 32, to: 32 }, { from: 48, to: 61 }, { from: 97, to: 99 }];
  t.deepEqual(actual, expected);
});
