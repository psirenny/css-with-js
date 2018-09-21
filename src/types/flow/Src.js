// @flow

import type { FontFormat } from './FontFormat';

export type Src = (
  | { type: 'local', name: string }
  | { type: 'url', url: string, format: FontFormat[] }
);
