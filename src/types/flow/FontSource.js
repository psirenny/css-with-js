// @flow

import type { FontSourceLocal } from './FontSourceLocal';
import type { FontSourceUrl } from './FontSourceUrl';

export type FontSource = (
  | FontSourceLocal
  | FontSourceUrl
);
