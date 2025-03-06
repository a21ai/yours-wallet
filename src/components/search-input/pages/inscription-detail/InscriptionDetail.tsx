import React, { useState } from 'react';
import styled from 'styled-components';
import { Ordinal as OrdinalType } from 'yours-wallet-provider';
import { useTheme } from '../../../../hooks/useTheme';
import { useServiceContext } from '../../../../hooks/useServiceContext';
import { useSnackbar } from '../../../../hooks/useSnackbar';
import { Ordinal } from '../../../Ordinal';
import { Button } from '../../../Button';
import { Input } from '../../../Input';
import { Show } from '../../../Show';
import { BSV_DECIMAL_CONVERSION } from '../../../../utils/constants';
import { sleep } from '../../../../utils/sleep';
import { getErrorMessage } from '../../../../utils/tools';
import { ListOrdinal } from '../../../../services/types/ordinal.types';
import validate from 'bitcoin-address-validation';

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 100%;
  max-width: 24rem;
  margin: 0 auto;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
`;

export type InscriptionDetailProps = {
  inscription: OrdinalType;
  action: 'list' | 'delist' | 'send';
  onClose: () => void;
};

export const InscriptionDetail = ({ inscription, action, onClose }: InscriptionDetailProps) => {
  const { theme } = useTheme();
  const { chromeStorageService, ordinalService, gorillaPoolService } = useServiceContext();
  const { addSnackbar } = useSnackbar();
  const [isProcessing, setIsProcessing] = useState(false);
  const [password, setPassword] = useState('');
  const [bsvAmount, setBsvAmount] = useState<number | null>();
  const [receiverAddress, setReceiverAddress] = useState('');
  const network = chromeStorageService.getNetwork();
  const isPasswordRequired = chromeStorageService.isPasswordRequired();

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

    const listing: ListOrdinal = {
      outpoint: inscription.outpoint,
      password,
      price: Math.ceil(bsvAmount * BSV_DECIMAL_CONVERSION),
    };

    const listRes = await ordinalService.listOrdinalOnGlobalOrderbook(listing);

    if (!listRes.txid || listRes.error) {
      addSnackbar(getErrorMessage(listRes.error), 'error');
      setIsProcessing(false);
      return;
    }

    addSnackbar('Listing Successful!', 'success');
    setIsProcessing(false);
    onClose();
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

    const cancelRes = await ordinalService.cancelGlobalOrderbookListing(inscription.outpoint, password);

    if (!cancelRes.txid || cancelRes.error) {
      addSnackbar(getErrorMessage(cancelRes.error), 'error');
      setIsProcessing(false);
      return;
    }

    addSnackbar('Successfully canceled the listing!', 'success');
    setIsProcessing(false);
    onClose();
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

    const transferRes = await ordinalService.transferOrdinalsMulti({
      outpoints: [inscription.outpoint],
      destinationAddresses: [receiverAddress],
      password,
    });

    if (!transferRes.txid || transferRes.error) {
      addSnackbar(getErrorMessage(transferRes.error), 'error');
      setIsProcessing(false);
      return;
    }

    addSnackbar('Transfer Successful!', 'success');
    setIsProcessing(false);
    onClose();
  };

  const renderForm = () => {
    switch (action) {
      case 'list':
        return (
          <FormContainer onSubmit={handleListInscription}>
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
            <ButtonsContainer>
              <Button theme={theme} type="secondary" label="Cancel" onClick={onClose} />
              <Button theme={theme} type="primary" label="List Now" disabled={isProcessing} isSubmit />
            </ButtonsContainer>
          </FormContainer>
        );
      case 'delist':
        return (
          <FormContainer onSubmit={handleDelistInscription}>
            <Show when={isPasswordRequired}>
              <Input
                theme={theme}
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Show>
            <ButtonsContainer>
              <Button theme={theme} type="secondary" label="Cancel" onClick={onClose} />
              <Button theme={theme} type="primary" label="Delist Now" disabled={isProcessing} isSubmit />
            </ButtonsContainer>
          </FormContainer>
        );
      case 'send':
        return (
          <FormContainer onSubmit={handleSendInscription}>
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
            <ButtonsContainer>
              <Button theme={theme} type="secondary" label="Cancel" onClick={onClose} />
              <Button theme={theme} type="primary" label="Send Now" disabled={isProcessing} isSubmit />
            </ButtonsContainer>
          </FormContainer>
        );
      default:
        return null;
    }
  };

  return (
    <DetailContainer>
      <h2>
        {action === 'list' ? 'List Inscription' : action === 'delist' ? 'Delist Inscription' : 'Send Inscription'}
      </h2>
      <Ordinal
        theme={theme}
        inscription={inscription}
        url={`${gorillaPoolService.getBaseUrl(network)}/content/${inscription.origin?.outpoint}?outpoint=${inscription?.outpoint}`}
        selected
        isTransfer
      />
      {renderForm()}
    </DetailContainer>
  );
};
