import { FiberRoot, Fiber } from 'react-reconciler';
import * as React$1 from 'react';
import { Signal } from '@preact/signals';

interface RenderChange {
  type: 'props' | 'context' | 'state';
  name: string;
  prevValue: unknown;
  nextValue: unknown;
  unstable: boolean;
}
interface AggregatedChange {
  type: Set<'props' | 'context' | 'state'>;
  unstable: boolean;
}
interface Render {
  phase: 'mount' | 'update' | 'unmount';
  componentName: string | null;
  time: number | null;
  count: number;
  forget: boolean;
  changes: Array<RenderChange>;
  unnecessary: boolean | null;
  didCommit: boolean;
  fps: number;
}
type OnRenderHandler = (fiber: Fiber, renders: Array<Render>) => void;
type OnCommitStartHandler = () => void;
type OnCommitFinishHandler = () => void;
type OnErrorHandler = (error: unknown) => void;
type IsValidFiberHandler = (fiber: Fiber) => boolean;
type OnActiveHandler = () => void;
interface InstrumentationConfig {
  onCommitStart: OnCommitStartHandler;
  isValidFiber: IsValidFiberHandler;
  onRender: OnRenderHandler;
  onCommitFinish: OnCommitFinishHandler;
  onError: OnErrorHandler;
  onActive?: OnActiveHandler;
  trackChanges: boolean;
  forceAlwaysTrackRenders?: boolean;
}
interface Instrumentation {
  isPaused: Signal<boolean>;
  fiberRoots: Set<FiberRoot>;
}
declare const createInstrumentation: (instanceKey: string, config: InstrumentationConfig) => Instrumentation;

type ComponentName = string;
interface Outline {
  domNode: HTMLElement;
  /** Aggregated render info */ aggregatedRender: AggregatedRender;
  alpha: number | null;
  totalFrames: number | null;
  groupedAggregatedRender: Map<Fiber, AggregatedRender> | null;
  current: DOMRect | null;
  target: DOMRect | null;
  estimatedTextWidth: number | null;
}
interface AggregatedRender {
  name: ComponentName;
  frame: number | null;
  phase: Set<'mount' | 'update' | 'unmount'>;
  time: number | null;
  aggregatedCount: number;
  forget: boolean;
  changes: AggregatedChange;
  unnecessary: boolean | null;
  didCommit: boolean;
  fps: number;
  computedKey: OutlineKey | null;
  computedCurrent: DOMRect | null;
}

type States =
  | {
      kind: 'inspecting';
      hoveredDomElement: HTMLElement | null;
      propContainer: HTMLDivElement;
    }
  | {
      kind: 'inspect-off';
      propContainer: HTMLDivElement;
    }
  | {
      kind: 'focused';
      focusedDomElement: HTMLElement;
      propContainer: HTMLDivElement;
    }
  | {
      kind: 'uninitialized';
      propContainer?: HTMLDivElement;
    };

interface RenderData {
  count: number;
  time: number;
  renders: Array<Render>;
  displayName: string | null;
  type: React.ComponentType<any> | null;
}

declare enum Device {
  DESKTOP = 0,
  TABLET = 1,
  MOBILE = 2,
}
interface Session {
  id: string;
  device: Device;
  agent: string;
  wifi: string;
  cpu: number;
  gpu: string | null;
  mem: number;
  url: string;
  route: string | null;
  commit: string | null;
  branch: string | null;
}
interface InternalInteraction {
  componentName: string;
  url: string;
  route: string | null;
  commit: string | null;
  branch: string | null;
  uniqueInteractionId: string;
  componentPath: Array<string>;
  performanceEntry: PerformanceInteraction;
  components: Map<string, InternalComponentCollection>;
}
interface InternalComponentCollection {
  uniqueInteractionId: string;
  name: string;
  renders: number;
  totalTime?: number;
  selfTime?: number;
  fibers: Set<Fiber>;
  retiresAllowed: number;
}
interface PerformanceInteractionEntry extends PerformanceEntry {
  interactionId: string;
  target: Element;
  name: string;
  duration: number;
  startTime: number;
  processingStart: number;
  processingEnd: number;
  entryType: string;
}
interface PerformanceInteraction {
  id: string;
  latency: number;
  entries: Array<PerformanceInteractionEntry>;
  target: Element;
  type: 'pointer' | 'keyboard';
  startTime: number;
  processingStart: number;
  processingEnd: number;
  duration: number;
  inputDelay: number;
  processingDuration: number;
  presentationDelay: number;
  timestamp: number;
  timeSinceTabInactive: number | 'never-hidden';
  visibilityState: DocumentVisibilityState;
  timeOrigin: number;
  referrer: string;
}

declare const getSession: ({ commit, branch }: { commit?: string | null; branch?: string | null }) => Promise<
  | Session
  | {
      id: string;
      url: string;
      route: null;
      device: Device;
      wifi: any;
      cpu: number;
      mem: any;
      gpu: string | null;
      agent: string;
      commit: string | null;
      branch: string | null;
      version: string | undefined;
    }
  | null
>;

interface Options {
  /**
   * Enable/disable scanning
   *
   * Please use the recommended way:
   * enabled: process.env.NODE_ENV === 'development',
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * Include children of a component applied with withScan
   *
   * @default true
   */
  includeChildren?: boolean;
  /**
   * Force React Scan to run in production (not recommended)
   *
   * @default false
   */
  dangerouslyForceRunInProduction?: boolean;
  /**
   * Enable/disable geiger sound
   *
   * @default true
   */
  playSound?: boolean;
  /**
   * Log renders to the console
   *
   * WARNING: This can add significant overhead when the app re-renders frequently
   *
   * @default false
   */
  log?: boolean;
  /**
   * Show toolbar bar
   *
   * If you set this to true, and set {@link enabled} to false, the toolbar will still show, but scanning will be disabled.
   *
   * @default true
   */
  showToolbar?: boolean;
  /**
   * Render count threshold, only show
   * when a component renders more than this
   *
   * @default 0
   */
  renderCountThreshold?: number;
  /**
   * Clear aggregated fibers after this time in milliseconds
   *
   * @default 5000
   */
  resetCountTimeout?: number;
  /**
   * Maximum number of renders for red indicator
   *
   * @default 20
   * @deprecated
   */
  maxRenders?: number;
  /**
   * Report data to getReport()
   *
   * @default false
   */
  report?: boolean;
  /**
   * Always show labels
   *
   * @default false
   */
  alwaysShowLabels?: boolean;
  /**
   * Animation speed
   *
   * @default "fast"
   */
  animationSpeed?: 'slow' | 'fast' | 'off';
  /**
   * Smoothly animate the re-render outline when the element moves
   *
   * @default true
   */
  smoothlyAnimateOutlines?: boolean;
  /**
   * Track unnecessary renders, and mark their outlines gray when detected
   *
   * An unnecessary render is defined as the component re-rendering with no change to the component's
   * corresponding dom subtree
   *
   *  @default false
   *  @warning tracking unnecessary renders can add meaningful overhead to react-scan
   */
  trackUnnecessaryRenders?: boolean;
  onCommitStart?: () => void;
  onRender?: (fiber: Fiber, renders: Array<Render>) => void;
  onCommitFinish?: () => void;
  onPaintStart?: (outlines: Array<Outline>) => void;
  onPaintFinish?: (outlines: Array<Outline>) => void;
}
type MonitoringOptions = Pick<
  Options,
  | 'includeChildren'
  | 'enabled'
  | 'renderCountThreshold'
  | 'resetCountTimeout'
  | 'onCommitStart'
  | 'onCommitFinish'
  | 'onPaintStart'
  | 'onPaintFinish'
  | 'onRender'
>;
interface Monitor {
  pendingRequests: number;
  interactions: Array<InternalInteraction>;
  session: ReturnType<typeof getSession>;
  url: string | null;
  route: string | null;
  apiKey: string | null;
  commit: string | null;
  branch: string | null;
}
interface StoreType {
  wasDetailsOpen: Signal<boolean>;
  isInIframe: Signal<boolean>;
  inspectState: Signal<States>;
  monitor: Signal<Monitor | null>;
  fiberRoots: WeakSet<Fiber>;
  reportData: WeakMap<Fiber, RenderData>;
  legacyReportData: Map<string, RenderData>;
  lastReportTime: Signal<number>;
}
type OutlineKey = `${string}-${string}`;
interface Internals {
  instrumentation: ReturnType<typeof createInstrumentation> | null;
  componentAllowList: WeakMap<React$1.ComponentType<any>, Options> | null;
  options: Signal<Options>;
  scheduledOutlines: Map<Fiber, Outline>;
  activeOutlines: Map<OutlineKey, Outline>;
  onRender: ((fiber: Fiber, renders: Array<Render>) => void) | null;
  Store: StoreType;
}
declare const Store: StoreType;
declare const ReactScanInternals: Internals;
declare const getReport: (type?: React$1.ComponentType<any>) => RenderData | Map<string, RenderData> | null;
declare const setOptions: (userOptions: Partial<Options>) => void;
declare const getOptions: () => Signal<Options>;
declare const reportRender: (fiber: Fiber, renders: Array<Render>) => void;
declare const isValidFiber: (fiber: Fiber) => boolean;
declare const getIsProduction: () => boolean | null;
declare const start: () => void;
declare const withScan: <T>(component: React$1.ComponentType<T>, options?: Options) => React$1.ComponentType<T>;
declare const scan: (options?: Options) => void;
declare const useScan: (options?: Options) => void;
declare const onRender: (type: unknown, _onRender: (fiber: Fiber, renders: Array<Render>) => void) => void;
declare const ignoredProps: WeakSet<
  | React$1.ReactElement<any, string | React$1.JSXElementConstructor<any>>
  | Iterable<React$1.ReactNode>
  | React$1.ReactPortal
>;
declare const ignoreScan: (node: React$1.ReactNode) => void;

export {
  type Internals,
  type MonitoringOptions,
  type Options,
  type OutlineKey,
  ReactScanInternals,
  Store,
  getIsProduction,
  getOptions,
  getReport,
  ignoreScan,
  ignoredProps,
  isValidFiber,
  onRender,
  reportRender,
  scan,
  setOptions,
  start,
  useScan,
  withScan,
};
