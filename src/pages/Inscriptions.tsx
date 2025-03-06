import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Ordinal } from '../components/Ordinal';
import { Ordinal as OrdType } from 'yours-wallet-provider';
import { PageLoader } from '../components/PageLoader';
import { ButtonContainer, Text } from '../components/Reusable';
import { Show } from '../components/Show';
import { useSnackbar } from '../hooks/useSnackbar';
import { useTheme } from '../hooks/useTheme';
import { useServiceContext } from '../hooks/useServiceContext';
import { TopNav } from '../components/TopNav';
import { WhiteLabelTheme } from '../theme.types';
import { useIntersectionObserver } from '../hooks/useIntersectObserver';
import { SearchInput } from '../components/search-input/SearchInput';

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
  const [selectedInscriptions, setSelectedInscriptions] = useState<OrdType[]>([]);
  const { addSnackbar } = useSnackbar();
  const [inscriptions, setInscriptions] = useState<OrdType[]>([]);
  const [from, setFrom] = useState<string>();
  const location = useLocation();
  const [pageState, setPageState] = useState<'main' | 'list' | 'delist' | 'send'>('main');

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
    const isSelected = selectedInscriptions.some((selected) => selected.outpoint === inscription.outpoint);

    if (isSelected) {
      // Deselect if already selected
      setSelectedInscriptions(selectedInscriptions.filter((selected) => selected !== inscription));
    } else {
      // Add to selection
      setSelectedInscriptions([...selectedInscriptions, inscription]);
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

  const renderInscriptions = (list: OrdType[]) => {
    return list
      .filter((l) => l.origin?.data?.insc?.file?.type !== 'application/bsv-20')
      .map((inscription) => (
        <Ordinal
          theme={theme}
          inscription={inscription}
          key={inscription.origin?.outpoint}
          url={`${gorillaPoolService.getBaseUrl(network)}/content/${inscription.origin?.outpoint}?outpoint=${inscription?.outpoint}`}
          selected={selectedInscriptions.some((selected) => selected.outpoint === inscription.outpoint)}
          onClick={() => toggleInscriptionSelection(inscription)}
        />
      ));
  };

  return (
    <>
      <TopNav />
      <SearchInput theme={theme} />
      <Show when={isProcessing}>
        <PageLoader theme={theme} message="Loading inscriptions..." />
      </Show>
      <Show when={!isProcessing}>
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
        <InscriptionButtonContainer theme={theme} $blur={selectedInscriptions.length > 0}>
          {selectedInscriptions.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: theme.color.component.primaryButtonLeftGradient,
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                }}
                onClick={() => setPageState('list')}
              >
                List for Sale
              </button>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: theme.color.component.primaryButtonLeftGradient,
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                }}
                onClick={() => setPageState('send')}
              >
                Send
              </button>
            </div>
          )}
        </InscriptionButtonContainer>
      </Show>
    </>
  );
};
