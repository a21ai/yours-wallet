import * as React from 'react';
import { MonitoringWithoutRouteProps, MonitoringProps } from '../../index.js';
import '../../../../index.js';
import 'react-reconciler';
import '@preact/signals';

declare function AstroMonitor(
  props: {
    path: string;
    params: Record<string, string | undefined>;
  } & MonitoringWithoutRouteProps,
): React.FunctionComponentElement<MonitoringProps>;

export { AstroMonitor };
