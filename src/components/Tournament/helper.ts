import { getTodayDate } from '../core/utils';
import { TournamentModel, TournamentProgressType, selectOptions } from './type';
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

export function getEmptyTournament(name: string, progress: TournamentProgressType) {
  return {
    id: null,
    name: name || '',
    ownerId: null,
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
