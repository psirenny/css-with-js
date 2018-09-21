// @flow

import type { Charset } from '../types/flow/Charset';
import type { UnicodeRange } from '../types/flow/UnicodeRange';

export default (exactRanges: UnicodeRange[], unusedCharset: Charset): UnicodeRange[] => {
  if (exactRanges.length === 0) return exactRanges;

  let rangeCurr = exactRanges[0];
  const results: UnicodeRange[] = [rangeCurr];

  for (let i = 1; i < exactRanges.length; i += 1) {
    const rangeNext = exactRanges[i];
    let shouldMerge = true;

    for (let charCode = rangeCurr.to + 1; charCode < rangeNext.from; charCode += 1) {
      const char = String.fromCharCode(charCode);

      if (!unusedCharset.includes(char)) {
        results.push(rangeNext);
        rangeCurr = rangeNext;
        shouldMerge = false;
        break;
      }
    }

    if (shouldMerge) {
      rangeCurr.to = rangeNext.from;
    }
  }

  return results;
};
