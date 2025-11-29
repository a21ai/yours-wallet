# Account Change Listener - accountsChanged Event

## Overview

Yours Wallet now supports an `accountsChanged` event that allows web applications to listen for when a user switches accounts in the wallet. This feature is similar to Unisat wallet's account change listener and follows wallet standard practices.

## Usage

### Listening to Account Changes

Web applications can listen for account changes using the `on` method provided by the Yours Wallet provider:

```javascript
// Listen for account changes
window.yours.on('accountsChanged', (params) => {
  console.log('Account changed!', params);
  
  // The params object contains the new account's addresses
  if (params?.data) {
    const { bsvAddress, ordAddress, identityAddress } = params.data;
    console.log('New BSV Address:', bsvAddress);
    console.log('New Ordinals Address:', ordAddress);
    console.log('New Identity Address:', identityAddress);
    
    // Update your application state with the new addresses
    updateAppState(params.data);
  }
});
```

### Full Example

Here's a complete example showing how to integrate the account change listener into a web3 dApp:

```javascript
// Check if Yours Wallet is available
if (window.yours) {
  // Connect to the wallet
  const connect = async () => {
    try {
      await window.yours.connect();
      const addresses = await window.yours.getAddresses();
      console.log('Connected with addresses:', addresses);
      displayAddresses(addresses);
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  // Setup account change listener
  const setupAccountListener = () => {
    window.yours.on('accountsChanged', (params) => {
      if (params?.data) {
        console.log('Account switched to:', params.data);
        displayAddresses(params.data);
        
        // Refresh any account-specific data
        refreshAccountData(params.data);
      }
    });
  };

  // Function to display addresses in UI
  const displayAddresses = (addresses) => {
    document.getElementById('bsv-address').textContent = addresses.bsvAddress;
    document.getElementById('ord-address').textContent = addresses.ordAddress;
    document.getElementById('identity-address').textContent = addresses.identityAddress;
  };

  // Function to refresh account-specific data
  const refreshAccountData = async (addresses) => {
    // Fetch new balance
    const balance = await window.yours.getBalance();
    console.log('New balance:', balance);
    
    // Fetch new ordinals
    const ordinals = await window.yours.getOrdinals();
    console.log('New ordinals:', ordinals);
    
    // Update your UI accordingly
    updateUI(balance, ordinals);
  };

  // Initialize
  setupAccountListener();
  
  // Connect button handler
  document.getElementById('connect-btn').addEventListener('click', connect);
}
```

### Removing the Listener

If you need to remove the event listener:

```javascript
const handleAccountChange = (params) => {
  console.log('Account changed:', params);
};

// Add listener
window.yours.on('accountsChanged', handleAccountChange);

// Remove listener when no longer needed
window.yours.removeListener('accountsChanged', handleAccountChange);
```

## Event Data Structure

The `accountsChanged` event passes a `params` object with the following structure:

```typescript
{
  data: {
    bsvAddress: string;      // The BSV payment address
    ordAddress: string;       // The Ordinals address
    identityAddress: string;  // The identity address
  }
}
```

## When is the Event Triggered?

The `accountsChanged` event is automatically triggered when:

1. A user switches between accounts in the Yours Wallet extension
2. A user creates a new account and switches to it
3. A user imports/restores an account and switches to it

## Comparison with Other Wallets

### Unisat Wallet

Similar to Unisat's `accountsChanged` event:
```javascript
// Unisat
unisat.on('accountsChanged', (accounts) => {
  console.log('Accounts:', accounts);
});

// Yours Wallet
window.yours.on('accountsChanged', (params) => {
  console.log('Addresses:', params.data);
});
```

### MetaMask (Ethereum)

Similar pattern to MetaMask:
```javascript
// MetaMask
ethereum.on('accountsChanged', (accounts) => {
  console.log('Accounts:', accounts);
});

// Yours Wallet  
window.yours.on('accountsChanged', (params) => {
  console.log('Addresses:', params.data);
});
```

## Best Practices

1. **Always check if the wallet is available** before setting up listeners:
   ```javascript
   if (typeof window.yours !== 'undefined') {
     // Setup listeners
   }
   ```

2. **Handle the case where addresses might be undefined**:
   ```javascript
   window.yours.on('accountsChanged', (params) => {
     if (params?.data?.bsvAddress) {
       // Process address change
     }
   });
   ```

3. **Clean up listeners** when your component/page unmounts:
   ```javascript
   useEffect(() => {
     const handler = (params) => {
       // Handle change
     };
     
     window.yours.on('accountsChanged', handler);
     
     return () => {
       window.yours.removeListener('accountsChanged', handler);
     };
   }, []);
   ```

4. **Refresh account-specific data** when account changes:
   - Balances
   - Ordinals/NFTs
   - Transaction history
   - Any cached data tied to the previous account

## Additional Events

Yours Wallet also supports:

- `signedOut` - Triggered when the user signs out of the wallet
- `switchAccount` - Internal event (not typically used by dApps)

## TypeScript Support

The event types are defined in the `yours-wallet-provider` package. For full TypeScript support, ensure you have the latest version:

```bash
npm install yours-wallet-provider@latest
```

Then you can use the types:

```typescript
import type { Addresses, YoursProviderType } from 'yours-wallet-provider';

declare global {
  interface Window {
    yours: YoursProviderType;
  }
}

window.yours.on('accountsChanged', (params?: { data?: Addresses }) => {
  if (params?.data) {
    const addresses: Addresses = params.data;
    // TypeScript will now provide autocomplete for addresses
  }
});
```

## Troubleshooting

### Event not firing
- Make sure you're using the latest version of Yours Wallet
- Check that the listener is set up before the account switch occurs
- Verify that your web page has proper permissions to access the wallet

### Getting undefined data
- Ensure the wallet is properly connected before setting up listeners
- Check browser console for any error messages

## Support

For issues, questions, or feature requests:
- [GitHub Issues](https://github.com/yours-org/yours-wallet/issues)
- [Discord Community](https://discord.gg/qHs6hTkmsf)
- [Twitter @yoursxbt](https://twitter.com/yoursxbt)
