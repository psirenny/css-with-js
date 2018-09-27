// @flow

export type FontFamilyGeneric = (
  | { type: 'generic', name: 'cursive' }
  | { type: 'generic', name: 'emoji' }
  | { type: 'generic', name: 'fangsong' }
  | { type: 'generic', name: 'fantasy' }
  | { type: 'generic', name: 'math' }
  | { type: 'generic', name: 'monospace' }
  | { type: 'generic', name: 'sans-serif' }
  | { type: 'generic', name: 'serif' }
  | { type: 'generic', name: 'system-ui' }
  | { type: 'generic', name: string }
);
