# Provider Types Update Required

## Overview

The `accountsChanged` event has been implemented in the Yours Wallet browser extension, but the TypeScript types in the `yours-wallet-provider` npm package need to be updated to reflect this new event.

## What Needs to Be Updated

The `yours-wallet-provider` package needs the following type updates:

### 1. Update YoursEvents Type

In the provider's type definitions, update:

```typescript
// Current
export type YoursEvents = "signedOut" | "switchAccount";

// Should be updated to
export type YoursEvents = "signedOut" | "switchAccount" | "accountsChanged";
```

### 2. Update YoursProviderType Interface (Optional Documentation)

While the `on` and `removeListener` methods already accept `YoursEvents`, it would be helpful to add JSDoc comments:

```typescript
export type YoursProviderType = {
  isReady: boolean;
  /**
   * Listen to wallet events
   * @param event - The event name ("signedOut" | "switchAccount" | "accountsChanged")
   * @param listener - Callback function to handle the event
   * 
   * @example
   * // Listen for account changes
   * window.yours.on('accountsChanged', (params) => {
   *   console.log('New addresses:', params?.data);
   * });
   */
  on: (event: YoursEvents, listener: YoursEventListeners) => void;
  removeListener: (event: YoursEvents, listener: YoursEventListeners) => void;
  // ... rest of the interface
};
```

## Current Workaround

Until the provider types are updated, developers can use the feature with type assertions:

```typescript
// TypeScript will accept this with current types if using 'any' or type assertion
window.yours.on('accountsChanged' as any, (params: any) => {
  if (params?.data) {
    const addresses = params.data as Addresses;
    // Use addresses
  }
});

// Or extend the types locally
declare module 'yours-wallet-provider' {
  type YoursEventsExtended = YoursEvents | 'accountsChanged';
  
  interface YoursProviderType {
    on(event: YoursEventsExtended, listener: YoursEventListeners): void;
    removeListener(event: YoursEventsExtended, listener: YoursEventListeners): void;
  }
}
```

## Repository Information

The `yours-wallet-provider` package is published to npm and needs to be updated in its source repository.

**Package:** `yours-wallet-provider@^3.7.0`

## Action Items

- [ ] Create PR/issue in the provider package repository to add `accountsChanged` to the `YoursEvents` type
- [ ] Update provider package version
- [ ] Publish updated provider package to npm
- [ ] Update Yours Wallet to use the new provider package version

## Testing

The feature works correctly without the type updates. The type updates are only needed for:
1. Better TypeScript developer experience
2. Proper autocomplete in IDEs
3. Type safety

## References

- Wallet implementation: `src/inject.ts` (line 212)
- Event emission: `src/background.ts` (switchAccount function)
- Documentation: `ACCOUNTS_CHANGED_EVENT.md`
