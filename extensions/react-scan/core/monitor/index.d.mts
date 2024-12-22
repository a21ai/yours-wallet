import { MonitoringOptions } from '../../index.mjs';
import 'react-reconciler';
import 'react';
import '@preact/signals';

interface MonitoringProps {
  url?: string;
  apiKey: string;
  path?: string | null;
  route?: string | null;
  params?: Record<string, string>;
  commit?: string | null;
  branch?: string | null;
}
type MonitoringWithoutRouteProps = Omit<MonitoringProps, 'route' | 'path'>;
declare const Monitoring: ({ url, apiKey, params, path, route, commit, branch }: MonitoringProps) => null;
declare const scanMonitoring: (options: MonitoringOptions) => void;
declare const startMonitoring: () => void;

export { Monitoring, type MonitoringProps, type MonitoringWithoutRouteProps, scanMonitoring, startMonitoring };
