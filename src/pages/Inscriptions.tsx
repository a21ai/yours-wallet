import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Ordinal } from '../components/Ordinal';
import { Ordinal as OrdType } from 'yours-wallet-provider';
import { PageLoader } from '../components/PageLoader';
import { ButtonContainer, Text, ConfirmContent, FormContainer, HeaderText } from '../components/Reusable';
import { Show } from '../components/Show';
import { useSnackbar } from '../hooks/useSnackbar';
import { useTheme } from '../hooks/useTheme';
import { useServiceContext } from '../hooks/useServiceContext';
import { TopNav } from '../components/TopNav';
import { WhiteLabelTheme } from '../theme.types';
import { useIntersectionObserver } from '../hooks/useIntersectObserver';
import { SearchInput } from '../components/search-input/SearchInput';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { BSV_DECIMAL_CONVERSION } from '../utils/constants';
import { sleep } from '../utils/sleep';
import { getErrorMessage } from '../utils/tools';
import { ListOrdinal } from '../services/types/ordinal.types';
import validate from 'bitcoin-address-validation';

const InscriptionsList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow-y: auto;
  width: 100%;
  margin-top: 4.5rem;
  height: 20rem;
  padding-bottom: 8rem;
`;

const NoInscriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const InscriptionButtonContainer = styled(ButtonContainer)<WhiteLabelTheme & { $blur: boolean }>`
  margin: 0;
  position: absolute;
  bottom: 3.75rem;
  height: 5rem;
  width: 100%;
  background-color: ${({ theme, $blur }) => ($blur ? theme.color.global.walletBackground + '95' : 'transparent')};
  backdrop-filter: ${({ $blur }) => ($blur ? 'blur(8px)' : 'none')};
`;

const SectionHeader = styled.h2<WhiteLabelTheme>`
  width: 100%;
  text-align: left;
  padding-left: 1rem;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.global.gray};
`;

export const Inscriptions = () => {
  const { theme } = useTheme();
  const { chromeStorageService, ordinalService, gorillaPoolService } = useServiceContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const { getOrdinals } = ordinalService;
  const network = chromeStorageService.getNetwork();
  const [selectedInscription, setSelectedInscription] = useState<OrdType | null>(null);
  const { addSnackbar } = useSnackbar();
  const [inscriptions, setInscriptions] = useState<OrdType[]>([]);
  const [from, setFrom] = useState<string>();
  const location = useLocation();
  const [pageState, setPageState] = useState<'main' | 'list' | 'delist' | 'send'>('main');
  const [password, setPassword] = useState('');
  const [bsvAmount, setBsvAmount] = useState<number | null>();
  const [receiverAddress, setReceiverAddress] = useState('');
  const [successTxId, setSuccessTxId] = useState('');
  const isPasswordRequired = chromeStorageService.isPasswordRequired();

  // Get action from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const action = params.get('action');
    if (action === 'list') {
      setPageState('list');
    } else if (action === 'delist') {
      setPageState('delist');
    } else if (action === 'send') {
      setPageState('send');
    } else {
      setPageState('main');
    }
  }, [location]);

  // Filter inscriptions that are not part of any collection
  // For now, we're using the same filter as OrdWallet but we'll need to add collection filtering
  const uncollectedInscriptions = inscriptions && inscriptions.filter((o) => !o?.data?.list);

  const toggleInscriptionSelection = (inscription: OrdType) => {
    const isSelected = selectedInscription && selectedInscription.outpoint === inscription.outpoint;

    if (isSelected) {
      // Deselect if already selected
      setSelectedInscription(null);
    } else {
      // Select the inscription
      setSelectedInscription(inscription);
    }
  };

  const { isIntersecting, elementRef } = useIntersectionObserver({
    root: null,
    threshold: 1.0,
  });

  const loadInscriptions = useCallback(async () => {
    if (!ordinalService) return;
    if (inscriptions.length === 0) setIsProcessing(true);
    const data = await getOrdinals(from);
    setFrom(data.from);
    setInscriptions((prev) => [...prev, ...data.ordinals]);
    setIsProcessing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordinalService, getOrdinals, from]);

  useEffect(() => {
    if (isIntersecting && from) {
      loadInscriptions();
    }
  }, [isIntersecting, from, loadInscriptions]);

  useEffect(() => {
    loadInscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetState = () => {
    setPassword('');
    setBsvAmount(null);
    setReceiverAddress('');
    setSuccessTxId('');
    setIsProcessing(false);
    setSelectedInscription(null);
  };

  const refreshInscriptions = async () => {
    const data = await getOrdinals();
    setInscriptions(data.ordinals);
    setFrom(data.from);
  };

  const handleListInscription = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    await sleep(25);
    if (!password && isPasswordRequired) {
      addSnackbar('You must enter a password!', 'error');
      setIsProcessing(false);
      return;
    }

    if (!bsvAmount || Number(bsvAmount) < 0.00000001) {
      addSnackbar('Must be more than 1 sat', 'error');
      setIsProcessing(false);
      return;
    }

    if (!selectedInscription) {
      addSnackbar('No inscription selected!', 'error');
      setIsProcessing(false);
      return;
    }

    const listing: ListOrdinal = {
      outpoint: selectedInscription.outpoint,
      password,
      price: Math.ceil(bsvAmount * BSV_DECIMAL_CONVERSION),
    };

    const listRes = await ordinalService.listOrdinalOnGlobalOrderbook(listing);

    if (!listRes.txid || listRes.error) {
      addSnackbar(getErrorMessage(listRes.error), 'error');
      setIsProcessing(false);
      return;
    }

    setSuccessTxId(listRes.txid);
    addSnackbar('Listing Successful!', 'success');
    setIsProcessing(false);
    setPageState('main');
    resetState();
    refreshInscriptions();
  };

  const handleDelistInscription = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    await sleep(25);
    if (!password && isPasswordRequired) {
      addSnackbar('You must enter a password!', 'error');
      setIsProcessing(false);
      return;
    }

    if (!selectedInscription) {
      addSnackbar('No inscription selected!', 'error');
      setIsProcessing(false);
      return;
    }

    const cancelRes = await ordinalService.cancelGlobalOrderbookListing(selectedInscription.outpoint, password);

    if (!cancelRes.txid || cancelRes.error) {
      addSnackbar(getErrorMessage(cancelRes.error), 'error');
      setIsProcessing(false);
      return;
    }

    setSuccessTxId(cancelRes.txid);
    addSnackbar('Successfully canceled the listing!', 'success');
    setIsProcessing(false);
    setPageState('main');
    resetState();
    refreshInscriptions();
  };

  const handleSendInscription = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    await sleep(25);
    if (!password && isPasswordRequired) {
      addSnackbar('You must enter a password!', 'error');
      setIsProcessing(false);
      return;
    }

    if (!receiverAddress) {
      addSnackbar('You must enter a receiver address!', 'error');
      setIsProcessing(false);
      return;
    }

    if (!validate(receiverAddress)) {
      addSnackbar('Invalid address format!', 'error');
      setIsProcessing(false);
      return;
    }

    if (!selectedInscription) {
      addSnackbar('No inscription selected!', 'error');
      setIsProcessing(false);
      return;
    }

    const transferRes = await ordinalService.transferOrdinalsMulti({
      outpoints: [selectedInscription.outpoint],
      destinationAddresses: [receiverAddress],
      password,
    });

    if (!transferRes.txid || transferRes.error) {
      addSnackbar(getErrorMessage(transferRes.error), 'error');
      setIsProcessing(false);
      return;
    }

    setSuccessTxId(transferRes.txid);
    addSnackbar('Transfer Successful!', 'success');
    setIsProcessing(false);
    setPageState('main');
    resetState();
    refreshInscriptions();
  };

  const renderInscriptions = (list: OrdType[]) => {
    return list
      .filter((l) => l.origin?.data?.insc?.file?.type !== 'application/bsv-20')
      .map((inscription) => (
        <Ordinal
          theme={theme}
          inscription={inscription}
          key={inscription.origin?.outpoint}
          url={`${gorillaPoolService.getBaseUrl(network)}/content/${inscription.origin?.outpoint}?outpoint=${inscription?.outpoint}`}
          selected={!!(selectedInscription && selectedInscription.outpoint === inscription.outpoint)}
          onClick={() => toggleInscriptionSelection(inscription)}
        />
      ));
  };

  const main = (
    <>
      <Show
        when={uncollectedInscriptions.length > 0}
        whenFalseContent={
          <NoInscriptionWrapper>
            <Text
              theme={theme}
              style={{
                color: theme.color.global.gray,
                fontSize: '1rem',
              }}
            >
              {theme.settings.services.ordinals
                ? "You don't have any uncollected inscriptions"
                : 'Wallet configuration does not support inscriptions!'}
            </Text>
          </NoInscriptionWrapper>
        }
      >
        <InscriptionsList>
          <SectionHeader theme={theme}>My Inscriptions</SectionHeader>
          {renderInscriptions(uncollectedInscriptions)}
          <div ref={elementRef} style={{ height: '1px' }} />
        </InscriptionsList>
      </Show>
      <InscriptionButtonContainer theme={theme} $blur={!!selectedInscription}>
        {selectedInscription && (
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <Button theme={theme} type="primary" label="List for Sale" onClick={() => setPageState('list')} />
            <Button theme={theme} type="primary" label="Send" onClick={() => setPageState('send')} />
            {selectedInscription.data?.list && (
              <Button theme={theme} type="warn" label="Delist" onClick={() => setPageState('delist')} />
            )}
          </div>
        )}
      </InscriptionButtonContainer>
    </>
  );

  const list = (
    <ConfirmContent>
      <HeaderText style={{ fontSize: '1.35rem' }} theme={theme}>
        List Inscription
      </HeaderText>
      {selectedInscription && (
        <Ordinal
          theme={theme}
          inscription={selectedInscription}
          url={`${gorillaPoolService.getBaseUrl(network)}/content/${selectedInscription.origin?.outpoint}?outpoint=${selectedInscription?.outpoint}`}
          selected
          isTransfer
        />
      )}
      <FormContainer noValidate onSubmit={(e) => handleListInscription(e)}>
        <Input
          theme={theme}
          placeholder="Enter BSV Amount"
          type="number"
          step="0.00000001"
          onChange={(e) => {
            const inputValue = e.target.value;
            if (inputValue === '') {
              setBsvAmount(null);
            } else {
              setBsvAmount(Number(inputValue));
            }
          }}
          value={bsvAmount !== null && bsvAmount !== undefined ? bsvAmount : ''}
        />
        <Show when={isPasswordRequired}>
          <Input
            theme={theme}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Show>
        <Text theme={theme} style={{ margin: '1rem 0 0 0' }}>
          Confirm global orderbook listing
        </Text>
        <Button theme={theme} type="primary" label="List Now" disabled={isProcessing} isSubmit />
        <Button
          theme={theme}
          type="secondary"
          label="Go back"
          onClick={() => {
            setPageState('main');
            resetState();
          }}
        />
      </FormContainer>
    </ConfirmContent>
  );

  const delist = (
    <ConfirmContent>
      <HeaderText style={{ fontSize: '1.35rem' }} theme={theme}>
        Delist Inscription
      </HeaderText>
      {selectedInscription && (
        <Ordinal
          theme={theme}
          inscription={selectedInscription}
          url={`${gorillaPoolService.getBaseUrl(network)}/content/${selectedInscription.origin?.outpoint}?outpoint=${selectedInscription?.outpoint}`}
          selected
          isTransfer
        />
      )}
      <FormContainer noValidate onSubmit={(e) => handleDelistInscription(e)}>
        <Show when={isPasswordRequired}>
          <Input
            theme={theme}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Show>
        <Button theme={theme} type="primary" label="Delist Now" disabled={isProcessing} isSubmit />
        <Button
          theme={theme}
          type="secondary"
          label="Go Back"
          onClick={() => {
            setPageState('main');
            resetState();
          }}
          disabled={isProcessing}
        />
      </FormContainer>
    </ConfirmContent>
  );

  const send = (
    <ConfirmContent>
      <HeaderText style={{ fontSize: '1.35rem' }} theme={theme}>
        Send Inscription
      </HeaderText>
      {selectedInscription && (
        <Ordinal
          theme={theme}
          inscription={selectedInscription}
          url={`${gorillaPoolService.getBaseUrl(network)}/content/${selectedInscription.origin?.outpoint}?outpoint=${selectedInscription?.outpoint}`}
          selected
          isTransfer
        />
      )}
      <FormContainer noValidate onSubmit={(e) => handleSendInscription(e)}>
        <Input
          theme={theme}
          placeholder="Receiver Address"
          type="text"
          value={receiverAddress}
          onChange={(e) => setReceiverAddress(e.target.value)}
        />
        <Show when={isPasswordRequired}>
          <Input
            theme={theme}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Show>
        <Button theme={theme} type="primary" label="Send Now" disabled={isProcessing} isSubmit />
        <Button
          theme={theme}
          type="secondary"
          label="Go back"
          onClick={() => {
            setPageState('main');
            resetState();
          }}
        />
      </FormContainer>
    </ConfirmContent>
  );

  return (
    <>
      <TopNav />
      <SearchInput theme={theme} />
      <Show when={isProcessing && pageState === 'main'}>
        <PageLoader theme={theme} message="Loading inscriptions..." />
      </Show>
      <Show when={isProcessing && pageState === 'list'}>
        <PageLoader theme={theme} message="Listing inscription..." />
      </Show>
      <Show when={isProcessing && pageState === 'delist'}>
        <PageLoader theme={theme} message="Delisting inscription..." />
      </Show>
      <Show when={isProcessing && pageState === 'send'}>
        <PageLoader theme={theme} message="Sending inscription..." />
      </Show>
      <Show when={!isProcessing && pageState === 'main'}>{main}</Show>
      <Show when={!isProcessing && pageState === 'list'}>{list}</Show>
      <Show when={!isProcessing && pageState === 'delist'}>{delist}</Show>
      <Show when={!isProcessing && pageState === 'send'}>{send}</Show>
    </>
  );
};
