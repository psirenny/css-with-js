// @flow

import type { AtFontFaceDeclarations } from './AtFontFaceDeclarations';
import type { RuleDeclarations } from './RuleDeclarations';

export type Statements = {
  '@font-face': {
    [string]: AtFontFaceDeclarations,
  },
  [string]: RuleDeclarations,
};
