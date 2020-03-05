import { getTodayDate } from '../core/utils';
import { TournamentModel } from './type';
import { useState } from 'react';

export function fetchTournaments(setterFunction: typeof useState, setterFunction2: typeof useState): void {
  (async () => {
    const response = await fetch('/api/tournament/list', {
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
    const response = await fetch(`/api/tournament/${tId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const result: TournamentModel = await response.json();
    setterFunction(result);
  })();
}

export async function getTournament(tId: number): Promise<TournamentModel | null> {
  const response = await fetch(`/api/tournament/${tId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const result: TournamentModel = await response.json();
  return response.ok ? result : null;
}
