(() => {
  'use strict';
  var e,
    E,
    s = {};
  (s.d = (e, E) => {
    for (var t in E) s.o(E, t) && !s.o(e, t) && Object.defineProperty(e, t, { enumerable: !0, get: E[t] });
  }),
    (s.o = (e, E) => Object.prototype.hasOwnProperty.call(e, E)),
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
    })(e || (e = {})),
    (function (e) {
      (e.YOURS_EMIT_EVENT = 'YoursEmitEvent'), (e.YOURS_REQUEST = 'YoursRequest'), (e.YOURS_RESPONSE = 'YoursResponse');
    })(E || (E = {}));
  const t = (e) => async (s) =>
      new Promise((t, n) => {
        const S = `${e}-${Date.now()}-${Math.random()}`,
          R = new CustomEvent(E.YOURS_REQUEST, { detail: { messageId: S, type: e, params: s } });
        self.addEventListener(
          S,
          function (E) {
            const s = E,
              { detail: S } = s;
            S.type === e && (S.success ? t(S.data) : n(S.error));
          },
          { once: !0 },
        ),
          self.dispatchEvent(R);
      }),
    n = [e.SIGNED_OUT, e.SWITCH_ACCOUNT],
    {
      on: S,
      removeListener: R,
      emit: T,
    } = (() => {
      const e = new Map();
      return {
        on: (E, s) => {
          var t;
          n.includes(E)
            ? (e.has(E) || e.set(E, []), null === (t = e.get(E)) || void 0 === t || t.push(s))
            : console.error('Event name is not whitelisted:', E);
        },
        removeListener: (E, s) => {
          const t = e.get(E);
          t &&
            e.set(
              E,
              t.filter((e) => e !== s),
            );
        },
        emit: (E, s) => {
          const t = e.get(E);
          t && t.forEach((e) => e(s));
        },
      };
    })(),
    _ = {
      isReady: !0,
      on: S,
      removeListener: R,
      connect: t(e.CONNECT),
      disconnect: t(e.DISCONNECT),
      isConnected: t(e.IS_CONNECTED),
      getPubKeys: t(e.GET_PUB_KEYS),
      getAddresses: t(e.GET_ADDRESSES),
      getNetwork: t(e.GET_NETWORK),
      getBalance: t(e.GET_BALANCE),
      getOrdinals: t(e.GET_ORDINALS),
      getBsv20s: t(e.GET_BSV20S),
      sendBsv: t(e.SEND_BSV),
      sendBsv20: t(e.SEND_BSV20),
      transferOrdinal: t(e.TRANSFER_ORDINAL),
      signMessage: t(e.SIGN_MESSAGE),
      broadcast: t(e.BROADCAST),
      getSignatures: t(e.GET_SIGNATURES),
      getSocialProfile: t(e.GET_SOCIAL_PROFILE),
      getPaymentUtxos: t(e.GET_PAYMENT_UTXOS),
      getExchangeRate: t(e.GET_EXCHANGE_RATE),
      purchaseOrdinal: t(e.PURCHASE_ORDINAL),
      purchaseBsv20: t(e.PURCHASE_BSV20),
      generateTaggedKeys: t(e.GENERATE_TAGGED_KEYS),
      getTaggedKeys: t(e.GET_TAGGED_KEYS),
      inscribe: t(e.INSCRIBE),
      encrypt: t(e.ENCRYPT),
      decrypt: t(e.DECRYPT),
    };
  'undefined' !== typeof window && ((window.panda = _), (window.yours = _));
  self.addEventListener(E.YOURS_EMIT_EVENT, (e) => {
    const E = e,
      { action: s, params: t } = E.detail;
    ((e, E) => {
      n.includes(e) && T(e, E);
    })(s, t);
  });
})();
//# sourceMappingURL=inject.js.map
