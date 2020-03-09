import React from 'react';
import { Button } from 'react-bootstrap';
import { textFilter, selectFilter } from 'react-bootstrap-table2-filter';

import { Type } from 'react-bootstrap-table2-editor';

// options for role column
const selectOptions = {
  Portiere: 'Portiere',
  Attaccante: 'Attaccante',
  Master: 'Master'
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
    headerStyle: (column, colIndex) => ({ width: '20%' }),
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
    headerStyle: (column, colIndex) => ({ width: '20%' }),
    filter: textFilter({
      placeholder: 'Filtra...',
      getFilter: filter => (surnameFilter = filter)
    })
  },
  {
    dataField: 'alias',
    text: 'Alias',
    headerClasses: 'player-table-header-element',
    headerStyle: (column, colIndex) => ({ width: '15%' }),
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
    headerStyle: (column, colIndex) => ({ width: '15%' }),
    filter: selectFilter({
      placeholder: 'Filtra...',
      options: selectOptions,
      getFilter: filter => (roleFilter = filter)
    }),
    editor: {
      type: Type.SELECT,
      getOptions: _ => {
        return [
          { value: 'Portiere', label: 'Portiere' },
          { value: 'Attaccante', label: 'Attaccante' },
          { value: 'Master', label: 'Master' }
        ];
      }
    }
  },
  {
    dataField: 'email',
    text: 'Email',
    headerStyle: (column, colIndex) => ({ width: '15%' }),
    headerClasses: 'player-table-header-element',
    autoSelectText: true
  },
  {
    dataField: 'phone',
    headerStyle: (column, colIndex) => ({ width: '15%' }),
    text: 'Telefono',
    headerClasses: 'player-table-header-element',
    autoSelectText: true
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
    const model = [...result, getEmptyPlayer('Nessun Giocatore')];
    console.log('fetchPlayers.result : ', model);
    setterFunction(model);
  })();
};

export function valueFormatter(selectedOption) {
  let value = '';
  if (!selectedOption) return '';
  if (selectedOption.alias) {
    value = selectedOption.alias;
  } else {
    value = selectedOption.surname ? `${selectedOption.name} - ${selectedOption.surname}` : selectedOption.name;
  }
  return value;
}

export function getEmptyPlayer(label) {
  return {
    id: null,
    name: '',
    surname: '',
    alias: '',
    label: label || '',
    role: 'Portiere',
    email: '',
    phone: '',
    match_played: 0,
    match_won: 0,
    total_score: 0,
    editable: false
  };
}
