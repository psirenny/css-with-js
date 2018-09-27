// @flow

import type { FontSourceLocal } from '../types/flow/FontSourceLocal';

export default (src: FontSourceLocal) => () => (
  `local(${src.name})`
);
