// @flow

import type { Charset } from '../types/flow/Charset';

export default (str: string): Charset => (
  str.split('').sort()
);
