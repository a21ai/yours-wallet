import * as React from 'react';
import { MonitoringWithoutRouteProps, MonitoringProps } from '../index.js';
import '../../../index.js';
import 'react-reconciler';
import '@preact/signals';

declare function ReactRouterMonitor(
  props: MonitoringWithoutRouteProps,
): React.FunctionComponentElement<MonitoringProps>;

export { ReactRouterMonitor as Monitoring };
