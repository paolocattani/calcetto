import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface NoDataProps {
  optionsLength: number;
  isEditable: boolean;
  addRow: () => void;
}

// Componente da mostrare se non sono presenti coppie
const NoData: React.FC<NoDataProps> = ({ addRow, optionsLength, isEditable }) => {
  const { t } = useTranslation(['common', 'pair']);
  const MIN_PLAYERS = 8;
  const players = optionsLength - 1;
  const diff = players < MIN_PLAYERS ? MIN_PLAYERS - players : 0;
  if (!optionsLength) return null;
  return players >= MIN_PLAYERS ? (
    <>
      <p>{`${t('pair:missing.1')}...`}</p>
      <Button variant="success" onClick={addRow} disabled={!isEditable}>
        {t('pair:add')}
      </Button>
    </>
  ) : (
    <>
      <p>{t('pair:missing.2', { current: players, min: MIN_PLAYERS })}</p>
      <p>{`${diff === 1 ? t('pair:missing.3') : t('pair:missing.4', { diff })}...`}</p>
      <Link to={'/player'}>
        <Button variant="success">{t('common:root.player')}</Button>
      </Link>
    </>
  );
};

export default NoData;
