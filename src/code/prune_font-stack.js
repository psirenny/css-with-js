// @flow

import type { FontFamily } from '../types/flow/FontFamily';

type Config = {
  availableFontFamilies?: FontFamily[],
  unavailableFontFamilies?: FontFamily[],
};

const defaultCfg = {
  availableFontFamilies: [
    { type: 'generic', name: 'cursive' },
    { type: 'generic', name: 'fantasy' },
    { type: 'generic', name: 'monospace' },
    { type: 'generic', name: 'sans-serif' },
    { type: 'generic', name: 'serif' },
    { type: 'generic', name: 'system-ui' },
  ],
  unavailableFontFamilies: [],
};

export default (cfg: ?Config) => {
  const { availableFontFamilies, unavailableFontFamilies } = { ...defaultCfg, ...cfg };

  return (stack: FontFamily[]): FontFamily[] => {
    const prunedStack = [];

    for (let i = 0; i < stack.length; i += 1) {
      const fontFamily = stack[i];
      const findFn = ff => ff.type === fontFamily.type && ff.name === fontFamily.name;

      if (availableFontFamilies.some(findFn)) {
        prunedStack.push(fontFamily);
        return prunedStack;
      }

      if (!unavailableFontFamilies.find(findFn)) {
        prunedStack.push(fontFamily);
      }
    }

    return prunedStack;
  };
};
