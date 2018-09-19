// @flow

import rollupPluginBabel from 'rollup-plugin-babel';
import rollupPluginFlowEntry from 'rollup-plugin-flow-entry';

export default {
  output: {
    format: ['cjs'],
  },
  plugins: [
    rollupPluginFlowEntry(),
    rollupPluginBabel(),
  ],
};
