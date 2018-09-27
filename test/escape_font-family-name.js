// @flow

import test from 'ava';
import { escapeFontFamilyName } from '../src';

test('"Custom Font"', (t) => {
  const fontFamily = 'Custom Font';
  const actual = escapeFontFamilyName({ compress: false })(fontFamily);
  const expected = '"Custom Font"';
  t.is(actual, expected);
});

test('\'Custom Font\'', (t) => {
  const fontFamily = 'Custom Font';
  const actual = escapeFontFamilyName({ compress: false, quote: '\'' })(fontFamily);
  const expected = '\'Custom Font\'';
  t.is(actual, expected);
});

test('Custom Font', (t) => {
  const fontFamily = 'Custom Font';
  const actual = escapeFontFamilyName()(fontFamily);
  const expected = 'Custom Font';
  t.is(actual, expected);
});

test('\\-Custom Font', (t) => {
  const fontFamily = '-Custom Font';
  const actual = escapeFontFamilyName()(fontFamily);
  const expected = '\\-Custom Font';
  t.is(actual, expected);
});

test('Custom \\-Font', (t) => {
  const fontFamily = 'Custom -Font';
  const actual = escapeFontFamilyName()(fontFamily);
  const expected = 'Custom \\-Font';
  t.is(actual, expected);
});

test('\\1Custom Font', (t) => {
  const fontFamily = '1Custom Font';
  const actual = escapeFontFamilyName()(fontFamily);
  const expected = '\\1Custom Font';
  t.is(actual, expected);
});

test('Custom \\1Font', (t) => {
  const fontFamily = 'Custom 1Font';
  const actual = escapeFontFamilyName()(fontFamily);
  const expected = 'Custom \\1Font';
  t.is(actual, expected);
});

test('"1Custom 2Font"', (t) => {
  const fontFamily = '1Custom 2Font';
  const actual = escapeFontFamilyName()(fontFamily);
  const expected = '"1Custom 2Font"';
  t.is(actual, expected);
});
