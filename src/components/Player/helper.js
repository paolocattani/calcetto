import React from 'react';
import { Button } from 'react-bootstrap';
import { textFilter, selectFilter } from 'react-bootstrap-table2-filter';

import { Type } from 'react-bootstrap-table2-editor';

// options for role column
const selectOptions = {
  0: 'Portiere',
  1: 'Attaccante',
  2: 'Master'
};

// Filter
let nameFilter;
let surnameFilter;
let aliasFilter;
let roleFilter;

export function clearAllFilter() {
  nameFilter('');
  surnameFilter('');
  aliasFilter('');
  roleFilter('');
}

// Columns de
export default [
  { dataField: 'id', text: 'ID', editable: false },
  {
    dataField: 'name',
    text: 'Nome',
    headerClasses: 'player-table-header-element',
    autoSelectText: true,
    filter: textFilter({
      placeholder: 'Filtra...',
      getFilter: filter => (nameFilter = filter)
    })
  },
  {
    dataField: 'surname',
    text: 'Cognome',
    headerClasses: 'player-table-header-element',
    autoSelectText: true,
    filter: textFilter({
      placeholder: 'Filtra...',
      getFilter: filter => (surnameFilter = filter)
    })
  },
  {
    dataField: 'alias',
    text: 'Alias',
    headerClasses: 'player-table-header-element',
    autoSelectText: true,
    filter: textFilter({
      placeholder: 'Filtra...',
      getFilter: filter => (aliasFilter = filter)
    })
  },
  {
    dataField: 'role',
    text: 'Roulo',
    headerClasses: 'player-table-header-element',
    filter: selectFilter({
      placeholder: 'Filtra...',
      options: selectOptions,
      getFilter: filter => (roleFilter = filter)
    }),
    editor: {
      type: Type.SELECT,
      // FIXME:
      getOptions: (setOptions, { row, column }) => {
        return [
          { value: 0, label: 'Portiere' },
          { value: 1, label: 'Attaccante' },
          { value: 2, label: 'Master' }
        ];
      }
    }
  },
  { dataField: 'match_played', text: 'Partite Giocate', hidden: true },
  { dataField: 'match_won', text: 'Vittorie', hidden: true },
  { dataField: 'total_score', text: 'Punteggio', hidden: true }
];

// Custom export button
export const ExportCSVButton = props => {
  return (
    <Button disabled className="btn btn-success" onClick={() => props.onExport()}>
      Esporta in CSV
    </Button>
  );
};

export const fetchPlayers = (setterFunction, tId) => {
  (async () => {
    const response = await fetch(tId ? `/api/player/list/${tId}` : '/api/player/list', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    setterFunction([
      ...result.map(e => ({
        id: e.id,
        name: e.name,
        surname: e.surname,
        alias: e.alias,
        label: e.alias,
        role: e.role,
        match_played: e.match_played,
        match_won: e.match_won,
        total_score: e.total_score
      })),
      {
        id: null,
        name: '',
        surname: '',
        alias: '',
        label: 'Nessun Giocatore',
        role: '',
        match_played: 0,
        match_won: 0,
        total_score: 0
      }
    ]);
  })();
};

export function valueFormatter(selectedOption) {
  let value = '';
  if (selectedOption.alias) {
    value = selectedOption.alias;
  } else {
    value = selectedOption.surname ? `${selectedOption.name} - ${selectedOption.surname}` : selectedOption.name;
  }
  return value;
}
