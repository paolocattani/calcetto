import { getTodayDate } from '../core/utils';
import { TournamentModel } from './type';
import { useState } from 'react';

export function fetchTournaments(setterFunction: typeof useState, setterFunction2: typeof useState) {
  (async () => {
    const response = await fetch('/api/tournament/list', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const result: TournamentModel[] = await response.json();
    let found = false;
    let tmp = result.map(e => {
      if (e.name === getTodayDate()) found = true;
      return { id: e.id, value: e.name, label: e.name };
    });
    if (!found) tmp.unshift({ id: null, value: getTodayDate(), label: getTodayDate() });
    tmp.sort();
    setterFunction(tmp);
    if (setterFunction2) setterFunction2(tmp[0]);
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
