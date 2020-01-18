import React from 'react';
import { Button } from 'react-bootstrap';
import { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';

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

// cellEditProps
export const cellEditProps = cellEditFactory({
  mode: 'click',
  blurToSave: true,
  afterSaveCell: (oldValue, newValue, row, column) => {
    (async () => {
      const response = await fetch('/api/player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(row)
      });
      const result = await response.json();
      console.table(result);
    })();
  }
});
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
      getFilter: filter => {
        nameFilter = filter;
      }
    })
  },
  {
    dataField: 'surname',
    text: 'Cognome',
    headerClasses: 'player-table-header-element',
    autoSelectText: true,
    filter: textFilter({
      placeholder: 'Filtra...',
      getFilter: filter => {
        surnameFilter = filter;
      }
    })
  },
  {
    dataField: 'alias',
    text: 'Vero Nome',
    headerClasses: 'player-table-header-element',
    autoSelectText: true,
    filter: textFilter({
      placeholder: 'Filtra...',
      getFilter: filter => {
        aliasFilter = filter;
      }
    })
  },
  {
    dataField: 'role',
    text: 'Roulo',
    headerClasses: 'player-table-header-element',
    filter: selectFilter({
      placeholder: 'Filtra...',
      options: selectOptions,
      getFilter: filter => {
        roleFilter = filter;
      }
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

export const fetchPlayers = setterFunction => {
  (async () => {
    const response = await fetch('/api/player/list', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    setterFunction(
      result.map(e => {
        return {
          id: e.id,
          name: e.name,
          surname: e.surname,
          label: e.alias,
          role: e.role,
          match_played: e.match_played,
          match_won: e.match_won,
          total_score: e.total_score
        };
      })
    );
  })();
};
