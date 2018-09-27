// @flow

import type { FontFamily } from '../types/flow/FontFamily';

export default (stack: FontFamily[]): FontFamily[] => {
  const nameCacheGeneric = {};
  const nameCacheSpecific = {};
  const uniqueStack = [];

  for (let i = 0; i < stack.length; i += 1) {
    const fontFamily = stack[i];

    if (fontFamily.type === 'generic') {
      if (!nameCacheGeneric[fontFamily.name]) {
        nameCacheGeneric[fontFamily.name] = true;
        uniqueStack.push(fontFamily);
      }
    } else if (!nameCacheSpecific[fontFamily.name]) {
      nameCacheSpecific[fontFamily.name] = true;
      uniqueStack.push(fontFamily);
    }
  }

  return uniqueStack;
};
