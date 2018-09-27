// @flow

import test from 'ava';
import { uniqueFontStack } from '../src';

const ff = { type: 'specific', name: 'ff' };
const generic = { type: 'generic', name: 'generic' };

test('ff,generic,ff → ff,generic', (t) => {
  const fontStack = [ff, generic, ff];
  const expected = [ff, generic];
  const actual = uniqueFontStack(fontStack);
  t.deepEqual(actual, expected);
});

test('ff,generic,generic → ff,generic', (t) => {
  const fontStack = [ff, generic, generic];
  const expected = [ff, generic];
  const actual = uniqueFontStack(fontStack);
  t.deepEqual(actual, expected);
});
