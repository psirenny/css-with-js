// @flow

import type { FontFamily } from '../types/flow/FontFamily';
import type { FontFamilyGeneric } from '../types/flow/FontFamilyGeneric';
import type { FontFamilySpecific } from '../types/flow/FontFamilySpecific';

type Pair = {|
  generic: FontFamilyGeneric;
  specific: FontFamilySpecific;
|};

type Config = {
  pairs?: Pair[],
};

const defaultCfg = {
  pairs: [],
};

export default (cfg: ?Config) => {
  const { pairs } = { ...defaultCfg, ...cfg };

  return (fontFamily: FontFamily) => {
    if (fontFamily.type === 'generic') {
      for (let i = 0; i < pairs.length; i += 1) {
        const pair = pairs[i];

        if (pair.generic.name === fontFamily.name) {
          return pair.specific.name.length < fontFamily.name.length
            ? pair.specific
            : fontFamily;
        }
      }
    } else {
      for (let i = 0; i < pairs.length; i += 1) {
        const pair = pairs[i];

        if (pair.specific.name === fontFamily.name) {
          return pair.generic.name.length < fontFamily.name.length
            ? pair.generic
            : fontFamily;
        }
      }
    }

    return fontFamily;
  };
};
