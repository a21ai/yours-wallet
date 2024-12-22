import * as rollup from 'rollup';
import { Options } from './index.js';
import 'unplugin';

declare const _default: (options: Options) => rollup.Plugin<any> | rollup.Plugin<any>[];

export { _default as default };
