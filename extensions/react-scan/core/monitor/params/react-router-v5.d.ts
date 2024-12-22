import * as React from 'react';
import { MonitoringWithoutRouteProps, MonitoringProps } from '../index.js';
import '../../../index.js';
import 'react-reconciler';
import '@preact/signals';

declare function ReactRouterV5Monitor(
  props: MonitoringWithoutRouteProps,
): React.FunctionComponentElement<MonitoringProps>;

export { ReactRouterV5Monitor as Monitoring };
