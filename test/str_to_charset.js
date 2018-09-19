// @flow

import test from 'ava';
import { strToCharset } from '../src';

export default test('str_to_charset', (t) => {
  const str = 'bac';
  const expected = ['a', 'b', 'c'];
  const actual = strToCharset(str);
  t.deepEqual(actual, expected);
});
