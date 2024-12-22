import * as React from 'react';
import { MonitoringWithoutRouteProps, MonitoringProps } from '../index.js';
import '../../../index.js';
import 'react-reconciler';
import '@preact/signals';

declare function RemixMonitor(props: MonitoringWithoutRouteProps): React.FunctionComponentElement<MonitoringProps>;

export { RemixMonitor as Monitoring };
