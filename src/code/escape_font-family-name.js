// @flow

import type { Quote } from '../types/flow/Quote';

type Config = {
  compress?: boolean,
  quote?: Quote,
};

const defaultCfg = {
  compress: true,
  quote: '"',
};

export default (cfg: ?Config) => {
  const mergedCfg = { ...defaultCfg, ...cfg };

  if (mergedCfg.compress) {
    return (name: string) => {
      const unescapedRegex = /(^\d|^-|\s\d|\s-|[^A-Za-z0-9-_ ])/g;
      const unescapedRegexFirst = /(^\d|^-|\s\d|\s-|[^A-Za-z0-9-_ ])/;
      const unescapedMatches = name.match(unescapedRegex);

      if (unescapedMatches) {
        if (unescapedMatches.length === 1) {
          const unescapedChars = unescapedMatches[0];

          return unescapedChars[0] === ' '
            ? name.replace(unescapedRegexFirst, ` \\${unescapedChars[1]}`)
            : name.replace(unescapedRegexFirst, `\\${unescapedChars[0]}`);
        }

        return `${mergedCfg.quote}${name}${mergedCfg.quote}`;
      }

      return name;
    };
  }

  return (str: string) => (
    `${mergedCfg.quote}${str}${mergedCfg.quote}`
  );
};
