import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useServiceContext } from '../../../hooks/useServiceContext';
import { useTheme } from '../../../hooks/useTheme';

export type InscriptionsCommandProps = {
  query: string;
  onClose: () => void;
};

export const InscriptionsCommand = ({ query, onClose }: InscriptionsCommandProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { ordinalService } = useServiceContext();

  const handleListInscription = () => {
    // Navigate to inscriptions page with list action
    navigate('/inscriptions?action=list');
    onClose();
  };

  const handleDelistInscription = () => {
    // Navigate to inscriptions page with delist action
    navigate('/inscriptions?action=delist');
    onClose();
  };

  const handleSendInscription = () => {
    // Navigate to inscriptions page with send action
    navigate('/inscriptions?action=send');
    onClose();
  };

  return (
    <div>
      <div
        style={{ cursor: 'pointer', padding: '0.5rem', color: theme.color.global.contrast }}
        onClick={handleListInscription}
      >
        List inscription for sale
      </div>
      <div
        style={{ cursor: 'pointer', padding: '0.5rem', color: theme.color.global.contrast }}
        onClick={handleDelistInscription}
      >
        Delist inscription from sale
      </div>
      <div
        style={{ cursor: 'pointer', padding: '0.5rem', color: theme.color.global.contrast }}
        onClick={handleSendInscription}
      >
        Send inscription to another address
      </div>
    </div>
  );
};
