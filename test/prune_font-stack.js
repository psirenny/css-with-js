// @flow

import test from 'ava';
import { pruneFontStack } from '../src';

const ff1 = { type: 'specific', name: 'ff1' };
const ff2 = { type: 'specific', name: 'ff2' };
const generic = { type: 'generic', name: 'generic' };

test('ff1,ff2,generic', (t) => {
  const fontStack = [ff1, ff2, generic];
  const expected = [ff1, ff2, generic];
  const actual = pruneFontStack()(fontStack);
  t.deepEqual(actual, expected);
});

test('ff1,*DELETE,generic', (t) => {
  const fontStack = [ff1, ff2, generic];
  const expected = [ff1, generic];
  const cfg = { unavailableFontFamilies: [ff2] };
  const actual = pruneFontStack(cfg)(fontStack);
  t.deepEqual(actual, expected);
});

test('ff1,*SKIP', (t) => {
  const fontStack = [ff1, ff2, generic];
  const expected = [ff1];
  const cfg = { availableFontFamilies: [ff1] };
  const actual = pruneFontStack(cfg)(fontStack);
  t.deepEqual(actual, expected);
});
