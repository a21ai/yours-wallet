(() => {
  'use strict';
  var e = {
      3299: (e, t, s) => {
        var n, E;
        s.d(t, { A: () => n, R: () => E }),
          (function (e) {
            (e.CONNECT = 'connectRequest'),
              (e.DISCONNECT = 'disconnect'),
              (e.IS_CONNECTED = 'isConnected'),
              (e.GET_PUB_KEYS = 'getPubKeys'),
              (e.GET_ADDRESSES = 'getAddresses'),
              (e.GET_NETWORK = 'getNetwork'),
              (e.GET_BALANCE = 'getBalance'),
              (e.GET_ORDINALS = 'getOrdinals'),
              (e.GET_BSV20S = 'getBsv20s'),
              (e.SEND_BSV = 'sendBsvRequest'),
              (e.SEND_BSV20 = 'sendBsv20Request'),
              (e.TRANSFER_ORDINAL = 'transferOrdinalRequest'),
              (e.SIGN_MESSAGE = 'signMessageRequest'),
              (e.BROADCAST = 'broadcastRequest'),
              (e.GET_SIGNATURES = 'getSignaturesRequest'),
              (e.GET_SOCIAL_PROFILE = 'getSocialProfile'),
              (e.GET_PAYMENT_UTXOS = 'getPaymentUtxos'),
              (e.GET_EXCHANGE_RATE = 'getExchangeRate'),
              (e.PURCHASE_ORDINAL = 'purchaseOrdinalRequest'),
              (e.PURCHASE_BSV20 = 'purchaseOrdinalRequest'),
              (e.GENERATE_TAGGED_KEYS = 'generateTaggedKeysRequest'),
              (e.GET_TAGGED_KEYS = 'getTaggedKeys'),
              (e.INSCRIBE = 'sendBsvRequest'),
              (e.ENCRYPT = 'encryptRequest'),
              (e.DECRYPT = 'decryptRequest'),
              (e.SIGNED_OUT = 'signedOut'),
              (e.USER_CONNECT_RESPONSE = 'userConnectResponse'),
              (e.SEND_BSV_RESPONSE = 'sendBsvResponse'),
              (e.SEND_BSV20_RESPONSE = 'sendBsv20Response'),
              (e.TRANSFER_ORDINAL_RESPONSE = 'transferOrdinalResponse'),
              (e.PURCHASE_ORDINAL_RESPONSE = 'purchaseOrdinalResponse'),
              (e.SIGN_MESSAGE_RESPONSE = 'signMessageResponse'),
              (e.BROADCAST_RESPONSE = 'broadcastResponse'),
              (e.GET_SIGNATURES_RESPONSE = 'getSignaturesResponse'),
              (e.GENERATE_TAGGED_KEYS_RESPONSE = 'generateTaggedKeysResponse'),
              (e.ENCRYPT_RESPONSE = 'encryptResponse'),
              (e.DECRYPT_RESPONSE = 'decryptResponse'),
              (e.SYNC_UTXOS = 'syncUtxos'),
              (e.QUEUE_STATUS_UPDATE = 'queueStatusUpdate'),
              (e.IMPORT_STATUS_UPDATE = 'importStatusUpdate'),
              (e.FETCHING_TX_STATUS_UPDATE = 'fetchingTx'),
              (e.BLOCK_HEIGHT_UPDATE = 'blockHeightUpdate'),
              (e.SWITCH_ACCOUNT = 'switchAccount');
          })(n || (n = {})),
          (function (e) {
            (e.YOURS_EMIT_EVENT = 'YoursEmitEvent'),
              (e.YOURS_REQUEST = 'YoursRequest'),
              (e.YOURS_RESPONSE = 'YoursResponse');
          })(E || (E = {}));
        const o = (e) => async (t) =>
            new Promise((s, n) => {
              const o = `${e}-${Date.now()}-${Math.random()}`,
                a = new CustomEvent(E.YOURS_REQUEST, { detail: { messageId: o, type: e, params: t } });
              self.addEventListener(
                o,
                function (t) {
                  const E = t,
                    { detail: o } = E;
                  o.type === e && (o.success ? s(o.data) : n(o.error));
                },
                { once: !0 },
              ),
                self.dispatchEvent(a);
            }),
          a = [n.SIGNED_OUT, n.SWITCH_ACCOUNT],
          {
            on: r,
            removeListener: S,
            emit: c,
          } = (() => {
            const e = new Map();
            return {
              on: (t, s) => {
                var n;
                a.includes(t)
                  ? (e.has(t) || e.set(t, []), null === (n = e.get(t)) || void 0 === n || n.push(s))
                  : console.error('Event name is not whitelisted:', t);
              },
              removeListener: (t, s) => {
                const n = e.get(t);
                n &&
                  e.set(
                    t,
                    n.filter((e) => e !== s),
                  );
              },
              emit: (t, s) => {
                const n = e.get(t);
                n && n.forEach((e) => e(s));
              },
            };
          })(),
          R = {
            isReady: !0,
            on: r,
            removeListener: S,
            connect: o(n.CONNECT),
            disconnect: o(n.DISCONNECT),
            isConnected: o(n.IS_CONNECTED),
            getPubKeys: o(n.GET_PUB_KEYS),
            getAddresses: o(n.GET_ADDRESSES),
            getNetwork: o(n.GET_NETWORK),
            getBalance: o(n.GET_BALANCE),
            getOrdinals: o(n.GET_ORDINALS),
            getBsv20s: o(n.GET_BSV20S),
            sendBsv: o(n.SEND_BSV),
            sendBsv20: o(n.SEND_BSV20),
            transferOrdinal: o(n.TRANSFER_ORDINAL),
            signMessage: o(n.SIGN_MESSAGE),
            broadcast: o(n.BROADCAST),
            getSignatures: o(n.GET_SIGNATURES),
            getSocialProfile: o(n.GET_SOCIAL_PROFILE),
            getPaymentUtxos: o(n.GET_PAYMENT_UTXOS),
            getExchangeRate: o(n.GET_EXCHANGE_RATE),
            purchaseOrdinal: o(n.PURCHASE_ORDINAL),
            purchaseBsv20: o(n.PURCHASE_BSV20),
            generateTaggedKeys: o(n.GENERATE_TAGGED_KEYS),
            getTaggedKeys: o(n.GET_TAGGED_KEYS),
            inscribe: o(n.INSCRIBE),
            encrypt: o(n.ENCRYPT),
            decrypt: o(n.DECRYPT),
          };
        'undefined' !== typeof window && ((window.panda = R), (window.yours = R));
        self.addEventListener(E.YOURS_EMIT_EVENT, (e) => {
          const t = e,
            { action: s, params: n } = t.detail;
          ((e, t) => {
            a.includes(e) && c(e, t);
          })(s, n);
        });
      },
    },
    t = {};
  function s(n) {
    var E = t[n];
    if (void 0 !== E) return E.exports;
    var o = (t[n] = { exports: {} });
    return e[n](o, o.exports, s), o.exports;
  }
  (s.d = (e, t) => {
    for (var n in t) s.o(t, n) && !s.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
  }),
    (s.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t));
  var n = s(3299);
  console.log('\ud83c\udf31 Yours Wallet Loaded');
  const E = document.createElement('script');
  (E.src = chrome.runtime.getURL('inject.js')),
    (document.head || document.documentElement).appendChild(E),
    self.addEventListener(n.R.YOURS_REQUEST, (e) => {
      const { type: t, messageId: s, params: E = {} } = e.detail;
      if (!t) return;
      let a = {};
      var r, S, c;
      t === n.A.CONNECT &&
        ((a.appName =
          document.title ||
          (null === (r = document.querySelector('meta[name="application-name"]')) || void 0 === r
            ? void 0
            : r.content) ||
          'Unknown'),
        (a.appIcon =
          (null === (S = document.querySelector('link[rel="apple-touch-icon"]')) || void 0 === S ? void 0 : S.href) ||
          (null === (c = document.querySelector('link[rel="icon"]')) || void 0 === c ? void 0 : c.href) ||
          ''));
      Array.isArray(E) ? (a.data = E) : 'object' === typeof E && (a = { ...a, ...E }),
        (a.domain = window.location.hostname),
        chrome.runtime.sendMessage({ action: t, params: a }, o(s));
    });
  const o = (e) => (t) => {
    const s = new CustomEvent(e, { detail: t });
    self.dispatchEvent(s);
  };
  chrome.runtime.onMessage.addListener((e) => {
    const { type: t, action: s, params: E } = e;
    if (t === n.R.YOURS_EMIT_EVENT) {
      const e = new CustomEvent(t, { detail: { action: s, params: E } });
      self.dispatchEvent(e);
    }
  });
})();
//# sourceMappingURL=content.js.map
