// @flow

import test from 'ava';
import { charsetToCssUnicodeRange } from '../src';

test('charset_to_css-unicode-range: _', (t) => {
  const charset = [];
  const actual = charsetToCssUnicodeRange(charset);
  const expected = '';
  t.deepEqual(actual, expected);
});

test('charset_to_css-unicode-range: x', (t) => {
  const charset = ['0'];
  const actual = charsetToCssUnicodeRange(charset);
  const expected = 'u+30';
  t.deepEqual(actual, expected);
});

test('charset_to_css-unicode-range: x,x', (t) => {
  const charset = ['0', '2'];
  const actual = charsetToCssUnicodeRange(charset);
  const expected = 'u+30,u+32';
  t.deepEqual(actual, expected);
});

test('charset_to_css-unicode-range: x, x', (t) => {
  const charset = ['0', '2'];
  const actual = charsetToCssUnicodeRange(charset, { space: true });
  const expected = 'u+30, u+32';
  t.deepEqual(actual, expected);
});

test('charset_to_css-unicode-range: x-y', (t) => {
  const charset = ['0', '1', '2'];
  const actual = charsetToCssUnicodeRange(charset);
  const expected = 'u+30-32';
  t.deepEqual(actual, expected);
});

test('charset_to_css-unicode-range: x,x-y,x,x-y', (t) => {
  const charset = [' ', '0', '1', '2', '=', 'a', 'b', 'c'];
  const actual = charsetToCssUnicodeRange(charset);
  const expected = 'u+20,u+30-32,u+3d,u+61-63';
  t.deepEqual(actual, expected);
});

test('charset_to_css-unicode-range: x?', (t) => {
  const charset = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?'];
  const actual = charsetToCssUnicodeRange(charset);
  const expected = 'u+3?';
  t.deepEqual(actual, expected);
});

test('charset_to_css-unicode-range: x??', (t) => {
  const offset = 256;
  const charset = Array.from({ length: 256 }, (_, i) => String.fromCharCode(offset + i));
  const actual = charsetToCssUnicodeRange(charset);
  const expected = 'u+1??';
  t.deepEqual(actual, expected);
});
