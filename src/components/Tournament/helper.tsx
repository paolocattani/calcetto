import { TournamentDTO, TournamentProgress } from '@common/dto';
import React, { CSSProperties } from 'react';

export function getEmptyTournament(name: string): TournamentDTO {
  return {
    id: null,
    name: name || '',
    ownerId: null,
    date: new Date(),
    progress: TournamentProgress.New,
    public: true,
    autoOrder: true,
    label: name || '',
  };
}

// -------------------------------------------------
// https://react-select.com/components#components
// Indicator Separator

export const IndicatorSeparator = ({ innerProps }: any) => <span style={indicatorSeparatorStyle} {...innerProps} />;
export const indicatorSeparatorStyle: CSSProperties = {
  alignSelf: 'stretch',
  backgroundColor: 'green',
  marginBottom: 8,
  marginTop: 8,
  marginRight: 10,
  width: 1,
};
export const cardStyle: CSSProperties = {
  width: '100%',
  margin: 'auto',
  backgroundColor: 'inherit',
  borderColor: '#ffc107',
  borderWidth: '3px',
  textAlign: 'left',
};
/*
const formatNewLabel = inputString => (
  <strong>
    {inputString}
    <small style={{ color: '#ccc' }}>@ New</small>
  </strong>
);

const formatOptionLabel = ({ name, progress, innerProps }) => (
  <strong>
    {name}
    <small style={{ color: '#ccc' }}>@{progress}</small>
  </strong>
);

*/
