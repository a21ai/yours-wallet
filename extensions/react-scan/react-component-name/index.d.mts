import * as unplugin from 'unplugin';

interface Options {
  include?: Array<string | RegExp>;
  exclude?: Array<string | RegExp>;
  parseDependencies?: boolean;
}
declare const reactComponentNamePlugin: unplugin.UnpluginInstance<Options, boolean>;

export { type Options, reactComponentNamePlugin as default, reactComponentNamePlugin };
