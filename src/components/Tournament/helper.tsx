import React from 'react';
import { getTodayDate } from '../core/utils';
import { TournamentModel, selectOptions } from './type';
import { useState } from 'react';

export function fetchTournaments(setterFunction: typeof useState, setterFunction2: typeof useState): void {
  (async () => {
    const response = await fetch('/api/v1/tournament/list', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const result: TournamentModel[] = await response.json();
    let found = result.find(e => e.name === getTodayDate());
    let tmp = found ? [found, ...result] : result;
    tmp.sort();
    setterFunction(tmp);
    if (setterFunction2) setterFunction2(tmp[0]);
  })();
}

export function fetchTournament(setterFunction: typeof useState, tId: number): void {
  (async () => {
    const response = await fetch(`/api/v1/tournament/${tId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const result: TournamentModel = await response.json();
    setterFunction(result);
  })();
}

export async function getTournament(tId: number): Promise<TournamentModel | null> {
  const response = await fetch(`/api/v1/tournament/${tId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const result: TournamentModel = await response.json();
  return response.ok ? result : null;
}

export function getEmptyTournament(name: string, progress?: string) {
  return {
    id: null,
    name: name || '',
    ownerId: null,
    date: new Date(),
    progress: progress || 'New',
    public: true,
    label: name || ''
  };
}

// select helper
export function customFilter(option: selectOptions, searchText: string): boolean {
  console.log('customFilter : ', option, typeof option.data);
  return option.data.name ? option.data.name.toLowerCase().includes(searchText.toLowerCase()) : false;
}

// -------------------------------------------------
// https://react-select.com/components#components
// Indicator Separator

export const IndicatorSeparator = ({ innerProps }: any) => <span style={indicatorSeparatorStyle} {...innerProps} />;
export const indicatorSeparatorStyle = {
  alignSelf: 'stretch',
  backgroundColor: 'green',
  marginBottom: 8,
  marginTop: 8,
  marginRigth: 10,
  width: 1
};
export const cardStyle = {
  width: '100%',
  margin: 'auto',
  backgroundColor: 'inherit',
  borderColor: '#ffc107',
  borderWidth: '3px',
  textAlign: 'left'
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
