// @flow

import test from 'ava';
import { reduceFontFamily } from '../src';

const genericLong = { type: 'generic', name: 'generic-generic-generic' };
const genericShort = { type: 'generic', name: 'gen' };
const genericUnknown = { type: 'generic', name: 'unknown' };
const specificLong = { type: 'specific', name: 'specific-generic-generic' };
const specificShort = { type: 'specific', name: 'spec' };
const specificUnknown = { type: 'specific', name: 'other' };

test('NOOP', (t) => {
  const fontFamily = specificShort;
  const expected = specificShort;
  const actual = reduceFontFamily()(fontFamily);
  t.deepEqual(actual, expected);
});

test('generic SKIP', (t) => {
  const fontFamily = genericLong;
  const pairs = [{ generic: genericUnknown, specific: specificShort }];
  const expected = genericLong;
  const actual = reduceFontFamily({ pairs })(fontFamily);
  t.deepEqual(actual, expected);
});

test('generic KEEP', (t) => {
  const fontFamily = genericShort;
  const pairs = [{ generic: genericShort, specific: specificLong }];
  const expected = genericShort;
  const actual = reduceFontFamily({ pairs })(fontFamily);
  t.deepEqual(actual, expected);
});

test('generic → specific', (t) => {
  const fontFamily = genericLong;
  const pairs = [{ generic: genericLong, specific: specificShort }];
  const expected = specificShort;
  const actual = reduceFontFamily({ pairs })(fontFamily);
  t.deepEqual(actual, expected);
});

test('specific SKIP', (t) => {
  const fontFamily = specificLong;
  const pairs = [{ generic: genericShort, specific: specificUnknown }];
  const expected = specificLong;
  const actual = reduceFontFamily({ pairs })(fontFamily);
  t.deepEqual(actual, expected);
});

test('specific KEEP', (t) => {
  const fontFamily = specificShort;
  const pairs = [{ generic: genericLong, specific: specificShort }];
  const expected = specificShort;
  const actual = reduceFontFamily({ pairs })(fontFamily);
  t.deepEqual(actual, expected);
});

test('specific → generic', (t) => {
  const fontFamily = specificLong;
  const pairs = [{ generic: genericShort, specific: specificLong }];
  const expected = genericShort;
  const actual = reduceFontFamily({ pairs })(fontFamily);
  t.deepEqual(actual, expected);
});
