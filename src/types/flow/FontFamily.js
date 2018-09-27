// @flow

import type { FontFamilyGeneric } from './FontFamilyGeneric';
import type { FontFamilySpecific } from './FontFamilySpecific';

export type FontFamily = (
  | FontFamilyGeneric
  | FontFamilySpecific
)
