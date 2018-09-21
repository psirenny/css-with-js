// @flow

import type { UnicodeRange } from '../types/flow/UnicodeRange';

export default (charset: string[]): UnicodeRange[] => {
  if (charset.length === 0) return [];

  let charCodeStart = charset[0].charCodeAt(0);
  let charCodePrev;
  let charCodeNext;
  let isInRange = false;
  const results: UnicodeRange[] = [];

  for (let i = 1; i < charset.length; i += 1) {
    charCodePrev = charset[i - 1].charCodeAt(0);
    charCodeNext = charset[i].charCodeAt(0);

    if (charCodeNext === charCodePrev + 1) {
      isInRange = true;
    } else if (isInRange) {
      results.push({ from: charCodeStart, to: charCodePrev });
      charCodeStart = charCodeNext;
      isInRange = false;
    } else {
      results.push({ from: charCodeStart, to: charCodeStart });
      charCodeStart = charCodeNext;
    }
  }

  if (isInRange) {
    results.push({ from: charCodeStart, to: ((charCodeNext: any): number) });
  } else {
    results.push({ from: charCodeStart, to: charCodeStart });
  }

  return results;
};
