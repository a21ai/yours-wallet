import { Options } from './index.js';
import 'unplugin';

declare const _default: (options?: Options) => {
  name: string;
  hooks: {
    'astro:config:setup': (astro: any) => void;
  };
};

export { _default as default };
