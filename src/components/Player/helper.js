import React from 'react';
import { Button } from 'react-bootstrap';
import { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { Type } from 'react-bootstrap-table2-editor';

export const selectOptions = {
  0: 'Portiere',
  1: 'Attaccante',
  2: 'Master'
};

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

export default [
  { dataField: 'id', text: 'ID', editable: false },
  {
    dataField: 'name',
    text: 'Nome',
    headerClasses: 'player-table-header-element',
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
      options: [
        { value: 0, label: 'Portiere' },
        { value: 1, label: 'Attaccante' },
        { value: 2, label: 'Master' }
      ]
    }
  },
  { dataField: 'match_played', text: 'Partite Giocate', hidden: true },
  { dataField: 'match_won', text: 'Vittorie', hidden: true },
  { dataField: 'total_score', text: 'Punteggio', hidden: true }
];

export const ExportCSVButton = props => {
  return (
    <Button disabled className="btn btn-success" onClick={() => props.onExport()}>
      Esporta in CSV
    </Button>
  );
};
