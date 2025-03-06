import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { WhiteLabelTheme } from '../../theme.types';
import { InscriptionsCommand } from './commands/inscriptions';

const SearchContainer = styled.div<WhiteLabelTheme>`
  position: relative;
  width: 100%;
  max-width: 24rem;
  margin: 0 auto;
  padding: 0.5rem 1rem;
`;

const SearchInputField = styled.input<WhiteLabelTheme>`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.color.global.gray};
  background-color: ${({ theme }) => theme.color.global.row};
  color: ${({ theme }) => theme.color.global.contrast};
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.color.component.primaryButtonLeftGradient};
  }
`;

const CommandsContainer = styled.div<WhiteLabelTheme>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.color.global.row};
  border: 1px solid ${({ theme }) => theme.color.global.gray};
  border-radius: 0.5rem;
  margin-top: 0.25rem;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 20rem;
  overflow-y: auto;
`;

export type SearchInputProps = {
  theme: any;
};

export const SearchInput = ({ theme }: SearchInputProps) => {
  const [query, setQuery] = useState('');
  const [isCommanderOpen, setIsCommanderOpen] = useState(false);
  const location = useLocation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsCommanderOpen(true);
  };

  const handleClose = () => {
    setIsCommanderOpen(false);
  };

  const renderCommands = () => {
    // Only show inscriptions commands on the inscriptions page
    if (location.pathname === '/inscriptions') {
      return <InscriptionsCommand query={query} onClose={handleClose} />;
    }
    return null;
  };

  return (
    <SearchContainer theme={theme}>
      <SearchInputField
        theme={theme}
        type="text"
        placeholder="Search or type a command..."
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsCommanderOpen(true)}
        onBlur={() => setTimeout(() => setIsCommanderOpen(false), 200)}
      />
      {isCommanderOpen && query && <CommandsContainer theme={theme}>{renderCommands()}</CommandsContainer>}
    </SearchContainer>
  );
};
