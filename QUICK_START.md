# Quick Start: Account Change Listener

## ✅ Implementation Complete!

The `accountsChanged` event listener has been successfully implemented in Yours Wallet, matching Unisat wallet's functionality.

## 🚀 How to Use It Now

### In Your Web App

```javascript
// 1. Check if wallet is available
if (window.yours) {
  
  // 2. Set up the listener
  window.yours.on('accountsChanged', (params) => {
    if (params?.data) {
      console.log('Account switched!');
      console.log('New BSV Address:', params.data.bsvAddress);
      console.log('New Ordinals Address:', params.data.ordAddress);
      console.log('New Identity Address:', params.data.identityAddress);
      
      // Update your app
      updateAppWithNewAccount(params.data);
    }
  });
  
  // 3. Connect to wallet (if needed)
  await window.yours.connect();
}
```

### Real-World Example

```javascript
// React example
useEffect(() => {
  const handleAccountChange = (params) => {
    if (params?.data) {
      setCurrentAddress(params.data.bsvAddress);
      fetchNewBalance(params.data.bsvAddress);
      fetchNewOrdinals(params.data.ordAddress);
    }
  };
  
  window.yours?.on('accountsChanged', handleAccountChange);
  
  return () => {
    window.yours?.removeListener('accountsChanged', handleAccountChange);
  };
}, []);
```

## 📋 What Changed

### Modified Files
- `src/inject.ts` - Added event type and whitelisting
- `src/background.ts` - Emit event when account switches
- `README.md` - Added feature to docs

### New Files
- `ACCOUNTS_CHANGED_EVENT.md` - Complete documentation
- `PROVIDER_TYPES_UPDATE.md` - Provider package update guide
- `IMPLEMENTATION_SUMMARY.md` - Technical details

## 🎯 When It Triggers

The event fires automatically when:
- User switches accounts in the wallet UI
- User creates a new account
- User imports/restores an account

## 📚 Documentation

For complete documentation with examples, see:
- **[ACCOUNTS_CHANGED_EVENT.md](ACCOUNTS_CHANGED_EVENT.md)** - Full guide
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Technical details

## ✨ Features

- ✅ Works exactly like Unisat's account change listener
- ✅ Provides all three address types (BSV, Ordinals, Identity)
- ✅ Simple event listener API
- ✅ Backward compatible
- ✅ Production ready

## 🔄 Build Status

✅ Code compiles successfully  
✅ No TypeScript errors  
✅ Tests pass  
✅ Ready to use!

## 📦 Next Release

To get this feature:
1. Build the extension from source, OR
2. Wait for the next Chrome Web Store release

## 🤝 Contributing

Found a bug or want to improve this? 
- [Create an issue](https://github.com/yours-org/yours-wallet/issues)
- [Join Discord](https://discord.gg/qHs6hTkmsf)

## 📝 Note on TypeScript

The feature works perfectly now. For full TypeScript support, the `yours-wallet-provider` package will need a minor update (details in `PROVIDER_TYPES_UPDATE.md`).

## 🎉 That's It!

You can now use `window.yours.on('accountsChanged', callback)` in your dApps, just like you would with Unisat wallet!
