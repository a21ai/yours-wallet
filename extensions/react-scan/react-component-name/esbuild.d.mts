import * as esbuild from 'esbuild';
import { Options } from './index.mjs';
import 'unplugin';

declare const _default: (options: Options) => esbuild.Plugin;

export { _default as default };
