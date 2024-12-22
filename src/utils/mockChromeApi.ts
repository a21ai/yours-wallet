import { HOSTED_YOURS_IMAGE } from './constants';

// Mock storage for development mode
const mockStorage: { [key: string]: any } = {
  // Initialize with some default mock data
  accounts: {},
  selectedAccount: '',
  accountNumber: 0,
  colorTheme: 'dark',
  isLocked: true,
  popupWindowId: null,
  exchangeRateCache: {},
  lastActiveTime: Date.now(),
  version: 1,
  hasUpgradedToSPV: false,
};

// Mock Chrome API for development environment
export const setupMockChromeApi = () => {
  // Always set up mock in development, regardless of existing chrome object
  if (process.env.NODE_ENV === 'development') {
    // Preserve any existing chrome API methods
    const existingChrome = (window as any).chrome || {};

    (window as any).chrome = {
      ...existingChrome,
      runtime: {
        getURL: (path: string) => path,
        sendMessage: (message: any, callback?: (response: any) => void) => {
          console.log('Mock chrome.runtime.sendMessage:', message);
          // Handle specific message types
          if (message.action === 'GET_STORAGE') {
            callback?.(mockStorage);
          } else if (message.action === 'SET_STORAGE') {
            Object.assign(mockStorage, message.data);
            callback?.({ success: true });
          } else if (message.action === 'SWITCH_ACCOUNT') {
            console.log('Switching account in mock');
            callback?.({ success: true });
          } else {
            callback?.({});
          }
        },
        onMessage: {
          addListener: (callback: (message: any, sender: any, sendResponse: any) => void) => {
            console.log('Mock chrome.runtime.onMessage.addListener registered');
            // Store the callback to handle future messages
            (window as any).__messageListeners = (window as any).__messageListeners || [];
            (window as any).__messageListeners.push(callback);
          },
          removeListener: (callback: any) => {
            if ((window as any).__messageListeners) {
              (window as any).__messageListeners = (window as any).__messageListeners.filter(
                (listener: any) => listener !== callback,
              );
            }
          },
        },
        lastError: null,
        // Add connect method for port-based communication
        connect: (connectInfo?: { name: string }) => {
          console.log('Mock chrome.runtime.connect:', connectInfo);
          return {
            postMessage: (message: any) => {
              console.log('Mock port.postMessage:', message);
              // Notify listeners
              if ((window as any).__messageListeners) {
                (window as any).__messageListeners.forEach((listener: any) => {
                  listener(message, { id: 'mock-sender' }, (response: any) => {
                    console.log('Mock port message response:', response);
                  });
                });
              }
            },
            onMessage: {
              addListener: (callback: any) => {
                console.log('Mock port.onMessage.addListener registered');
              },
            },
            disconnect: () => {
              console.log('Mock port disconnected');
            },
          };
        },
      },
      storage: {
        local: {
          get: (keys: string | string[] | null, callback: (items: { [key: string]: any }) => void) => {
            console.log('Mock chrome.storage.local.get:', keys);
            if (keys === null) {
              callback(mockStorage);
            } else {
              const items: { [key: string]: any } = {};
              const keyArray = typeof keys === 'string' ? [keys] : keys;
              keyArray.forEach((key) => {
                if (mockStorage[key]) items[key] = mockStorage[key];
              });
              callback(items);
            }
          },
          set: (items: { [key: string]: any }, callback?: () => void) => {
            console.log('Mock chrome.storage.local.set:', items);
            Object.assign(mockStorage, items);
            // Notify listeners about storage changes
            if ((window as any).__messageListeners) {
              (window as any).__messageListeners.forEach((listener: any) => {
                listener({ action: 'STORAGE_CHANGED', data: mockStorage }, { id: 'mock-sender' }, (response: any) => {
                  console.log('Storage change notification response:', response);
                });
              });
            }
            if (callback) callback();
          },
          remove: (keys: string | string[], callback?: () => void) => {
            console.log('Mock chrome.storage.local.remove:', keys);
            const keyArray = typeof keys === 'string' ? [keys] : keys;
            keyArray.forEach((key) => delete mockStorage[key]);
            if (callback) callback();
          },
          clear: (callback?: () => void) => {
            console.log('Mock chrome.storage.local.clear');
            Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
            if (callback) callback();
          },
        },
      },
      windows: {
        create: (options: any, callback?: (window: any) => void) => {
          console.log('Mock chrome.windows.create:', options);
          if (callback) callback({ id: 1 });
        },
        remove: (windowId: number, callback?: () => void) => {
          console.log('Mock chrome.windows.remove:', windowId);
          if (callback) callback();
        },
      },
      notifications: {
        create: (options: any, callback?: (notificationId: string) => void) => {
          console.log('Mock chrome.notifications.create:', options);
          if (callback) callback('mock-notification-id');
        },
      },
    };
  }
};
