// @flow

import type { UnicodeRange } from '../types/flow/UnicodeRange';

type Config = {
  space?: boolean,
  upper?: boolean,
};

export default (cfg?: ?Config) => {
  const delim = cfg?.space ? ', ' : ',';
  const u = cfg?.upper ? 'U' : 'u';

  const getUnicodeStr = (range: UnicodeRange): string => {
    const left = range.from.toString(16);

    if (range.from === range.to) {
      return `${u}+${range.from.toString(16)}`;
    }

    const right = range.to.toString(16);
    let leftPad = left.padStart(right.length, '0');
    let wildcards = '';

    for (let i = right.length - 1; i >= 0; i -= 1) {
      const rightChar = right[i];
      const leftChar = leftPad[i];

      if (leftChar === '0' && rightChar === 'f') {
        leftPad = leftPad.slice(0, -1);
        wildcards += '?';
      } else if (leftChar === rightChar) {
        break;
      } else {
        return `${u}+${left}-${right}`;
      }
    }

    return `${u}+${leftPad}${wildcards}`;
  };

  return (ranges: UnicodeRange[]): ?string => {
    if (!ranges.length) {
      return undefined;
    }

    if (ranges[0].from === 0 && ranges[0].to > 1114111) {
      return null;
    }

    let result = getUnicodeStr(ranges[0]);

    for (let i = 1; i < ranges.length; i += 1) {
      result += delim;
      result += getUnicodeStr(ranges[i]);
    }

    return result;
  };
};
