import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Broadcast } from 'yours-wallet-provider';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PageLoader } from '../../components/PageLoader';
import { ConfirmContent, FormContainer, HeaderText, Text } from '../../components/Reusable';
import { Show } from '../../components/Show';
import { useBottomMenu } from '../../hooks/useBottomMenu';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useTheme } from '../../hooks/useTheme';
import { BSV_DECIMAL_CONVERSION } from '../../utils/constants';
import { sleep } from '../../utils/sleep';
import { sendMessage, removeWindow } from '../../utils/chromeHelpers';
import { useServiceContext } from '../../hooks/useServiceContext';
import { getTxFromRawTxFormat } from '../../utils/tools';
import { IndexContext } from 'spv-store';
import TxPreview from '../../components/TxPreview';
import { styled } from 'styled-components';

const Wrapper = styled(ConfirmContent)`
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
`;

export type BroadcastResponse = {
  txid: string;
};

export type BroadcastRequestProps = {
  request: Broadcast;
  popupId: number | undefined;
  onBroadcast: () => void;
};

export const BroadcastRequest = (props: BroadcastRequestProps) => {
  const { request, onBroadcast, popupId } = props;
  const { theme } = useTheme();
  const { handleSelect, hideMenu } = useBottomMenu();
  const [txid, setTxid] = useState('');
  const { addSnackbar, message } = useSnackbar();
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [satsOut, setSatsOut] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [txData, setTxData] = useState<IndexContext>();
  const { keysService, bsvService, chromeStorageService, oneSatSPV } = useServiceContext();
  const { bsvAddress, ordAddress, identityAddress } = keysService;

  useEffect(() => {
    (async () => {
      if (!request.rawtx || !oneSatSPV || !!txData) return;
      setIsLoading(true);
      const tx = getTxFromRawTxFormat(request.rawtx, request.format || 'tx');
      const parsedTx = await oneSatSPV.parseTx(tx);
      setTxData(parsedTx);
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSelect('bsv');
    hideMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSelect, handleSelect]);

  const resetSendState = () => {
    setTxid('');
    setIsProcessing(false);
  };

  useEffect(() => {
    if (!txid) return;
    if (!message && txid) {
      resetSendState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, txid]);

  const userAddresses = useMemo(() => {
    if (!bsvAddress || !ordAddress || !identityAddress) return [];
    return [bsvAddress, ordAddress, identityAddress];
  }, [bsvAddress, ordAddress, identityAddress]);

  const calculateUserSatsOut = useCallback(
    (txData: IndexContext) => {
      if (!txData || userAddresses.length === 0) return 0n;

      // Calculate how much the user put into the tx
      const spendSats = txData.spends.reduce((acc, spend) => {
        if (spend.owner && userAddresses.includes(spend.owner)) {
          return acc + spend.satoshis;
        }
        return acc;
      }, 0n);

      // Calculate how much the user got back from the tx
      return txData.txos.reduce((acc, txo) => {
        if (txo.owner && userAddresses.includes(txo.owner)) {
          return acc - txo.satoshis;
        }
        return acc;
      }, spendSats);
    },
    [userAddresses],
  );

  useEffect(() => {
    if (!txData) return;
    const satsOutValue = calculateUserSatsOut(txData);
    setSatsOut(Number(satsOutValue));
  }, [txData, calculateUserSatsOut]);

  const handleBroadcast = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setIsProcessing(true);
        await sleep(25);

        let rawtx = request.rawtx;
        if (request.fund) {
          if (!passwordConfirm) {
            addSnackbar('Must enter a password!', 'error');
            setIsProcessing(false);
            return;
          }

          const res = await bsvService.fundRawTx(rawtx, passwordConfirm);
          if (!res.rawtx || res.error) {
            const message =
              res.error === 'invalid-password'
                ? 'Invalid Password!'
                : 'An unknown error has occurred! Try again.' + res.error;

            addSnackbar(message, 'error');
            setIsProcessing(false);
            return;
          }
          rawtx = res.rawtx;
        }
        const tx = getTxFromRawTxFormat(rawtx, request.format || 'tx');

        const resp = await oneSatSPV.broadcast(tx, 'provider', request.format === 'beef');
        if (resp.status === 'error') {
          addSnackbar('Error broadcasting the raw tx!', 'error');
          setIsProcessing(false);
          sendMessage({
            action: 'broadcastResponse',
            error: resp.description ?? 'Unknown error',
          });
          onBroadcast();
          return;
        }
        setTxid(resp.txid);
        sendMessage({
          action: 'broadcastResponse',
          txid: resp.txid,
        });

        addSnackbar('Successfully broadcasted the tx!', 'success');
        await sleep(2000);
        onBroadcast();
      } catch (error) {
        console.error(error);
      } finally {
        setIsProcessing(false);
      }
    },
    [request, passwordConfirm, bsvService, oneSatSPV, addSnackbar, onBroadcast],
  );

  const clearRequest = useCallback(async () => {
    await chromeStorageService.remove('broadcastRequest');
    if (popupId) removeWindow(popupId);
    window.location.reload();
  }, [chromeStorageService, popupId]);

  const formContent = useMemo(
    () => (
      <FormContainer noValidate onSubmit={handleBroadcast}>
        <Show when={chromeStorageService.isPasswordRequired()}>
          <Input
            theme={theme}
            placeholder="Enter Wallet Password"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </Show>
        {txData && <TxPreview txData={txData} />}
        <Button
          theme={theme}
          type="primary"
          label={`Broadcast - ${satsOut > 0 ? satsOut / BSV_DECIMAL_CONVERSION : 0} BSV`}
          disabled={isProcessing}
          isSubmit
        />
        <Button theme={theme} type="secondary" label="Cancel" onClick={clearRequest} disabled={isProcessing} />
      </FormContainer>
    ),
    [
      handleBroadcast,
      chromeStorageService,
      theme,
      passwordConfirm,
      setPasswordConfirm,
      txData,
      satsOut,
      isProcessing,
      clearRequest,
    ],
  );

  return (
    <>
      <Show when={isProcessing || isLoading}>
        <PageLoader theme={theme} message={isLoading ? 'Loading request...' : 'Broadcasting transaction...'} />
      </Show>
      <Show when={!isProcessing && !isLoading && !!request && !!txData}>
        <Wrapper>
          <HeaderText theme={theme}>Broadcast Raw Tx</HeaderText>
          <Text theme={theme} style={{ margin: '0.75rem 0', textAlign: 'center' }}>
            The app is requesting to broadcast a transaction.
          </Text>
          {formContent}
        </Wrapper>
      </Show>
    </>
  );
};
