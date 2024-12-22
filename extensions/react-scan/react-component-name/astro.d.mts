import { Options } from './index.mjs';
import 'unplugin';

declare const _default: (options?: Options) => {
  name: string;
  hooks: {
    'astro:config:setup': (astro: any) => void;
  };
};

export { _default as default };
