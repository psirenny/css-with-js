// @flow

import type { FontSource } from './FontSource';
import type { FontWeight } from './FontWeight';

export type AtFontFaceDeclarations = {
  'font-family'?: string,
  'font-weight'?: FontWeight,
  'src'?: FontSource[],
};
