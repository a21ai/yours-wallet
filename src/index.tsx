import { Buffer } from 'buffer';
import process from 'process';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from './contexts/ColorThemeContext';
import { ServiceProvider } from './contexts/ServiceContext';
import { Web3RequestProvider } from './contexts/Web3RequestContext';
import './index.css';
import { setupMockChromeApi } from './utils/mockChromeApi';

// Setup mock Chrome API before anything else in development mode
if (process.env.NODE_ENV === 'development') {
  setupMockChromeApi();
}

// Enable React profiling in development mode
if (process.env.NODE_ENV === 'development') {
  // Enable detailed profiling
  // @ts-ignore
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
    supportsFiber: true,
    inject: function (internals: Record<string, unknown>) {
      this.rendererInterfaces = new Map<string, unknown>();
      this.listeners = new Set<(renderer: unknown) => void>();

      const attachRenderer = (renderer: unknown) => {
        const rid = Math.random().toString(16).slice(2);
        const rendererInterface = {
          ...internals,
          rid,
          renderer,
          listenToCommits: true,
          captureHookNames: true,
        };
        this.rendererInterfaces.set(rid, rendererInterface);
        this.listeners.forEach((listener: (renderer: unknown) => void) => listener(rendererInterface));
        return rid;
      };

      this.attachRenderer = attachRenderer;
      this.on = (callback: (renderer: unknown) => void) => {
        this.listeners.add(callback);
      };
    },
  };
  // Enable component stack traces
  Error.stackTraceLimit = Infinity;
  // Enable React Profiler
  localStorage.setItem('react-profiling', 'true');
  // Enable component highlighting
  localStorage.setItem('react-devtools-highlight-updates', 'true');
}
global.Buffer = Buffer;
global.process = process;
window.Buffer = Buffer;

const root = document.getElementById('root');
if (!root) throw new Error('Root element');
const rootDiv = ReactDOM.createRoot(root);
rootDiv.render(
  <Web3RequestProvider>
    <ServiceProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ServiceProvider>
  </Web3RequestProvider>,
);
