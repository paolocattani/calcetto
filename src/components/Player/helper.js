import React from 'react';
import { Button } from 'react-bootstrap';
import filterTableFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { Type } from 'react-bootstrap-table2-editor';
import { getEmptyPlayer } from 'redux/services/player.service';
import { PlayerRole } from '../../redux/models/player.model';
import cellEditFactory from 'react-bootstrap-table2-editor';

// Filter
let nameFilter;
let surnameFilter;
let aliasFilter;
let roleFilter;
let emailFilter;
let phoneFilter;

export function clearAllFilter() {
  nameFilter('');
  surnameFilter('');
  aliasFilter('');
  roleFilter('');
  emailFilter('');
  phoneFilter('');
}

export const filterFactory = filterTableFactory();
export const cellEditProps = (isAdmin, dispatch) =>
  cellEditFactory({
    mode: isAdmin ? 'click' : 'none',
    blurToSave: true,
    autoSelectText: true,
    afterSaveCell: (oldValue, newValue, player, column) => dispatch(player),
  });

// Columns default
const playerColumns = (isAdmin) => [
  { dataField: 'rowNumber', text: 'ID', editable: false, headerStyle: (column, colIndex) => ({ width: '3%' }) },
  {
    dataField: 'name',
    text: 'Nome',
    headerClasses: 'player-table-header-element',
    autoSelectText: true,
    headerStyle: (column, colIndex) => ({ width: isAdmin ? '16%' : '25%' }),
    filter: textFilter({
      placeholder: 'Filtra...',
      getFilter: (filter) => (nameFilter = filter),
    }),
  },
  {
    dataField: 'surname',
    text: 'Cognome',
    headerClasses: 'player-table-header-element',
    autoSelectText: true,
    headerStyle: (column, colIndex) => ({ width: isAdmin ? '16%' : '25%' }),
    filter: textFilter({
      placeholder: 'Filtra...',
      getFilter: (filter) => (surnameFilter = filter),
    }),
  },
  {
    dataField: 'alias',
    text: 'Alias',
    headerClasses: 'player-table-header-element',
    headerStyle: (column, colIndex) => ({ width: isAdmin ? '17%' : '25%' }),
    autoSelectText: true,
    filter: textFilter({
      placeholder: 'Filtra...',
      getFilter: (filter) => (aliasFilter = filter),
    }),
  },
  {
    dataField: 'role',
    text: 'Roulo',
    headerClasses: 'player-table-header-element',
    headerStyle: (column, colIndex) => ({ width: `${isAdmin ? '11' : '15'}%` }),
    filter: selectFilter({
      placeholder: 'Filtra...',
      options: {
        [PlayerRole.GoalKeeper]: PlayerRole.GoalKeeper,
        [PlayerRole.Striker]: PlayerRole.Striker,
        [PlayerRole.Master]: PlayerRole.Master,
      },
      getFilter: (filter) => (roleFilter = filter),
    }),
    editor: {
      type: Type.SELECT,
      getOptions: (_) => {
        return [
          { value: PlayerRole.GoalKeeper, label: PlayerRole.GoalKeeper },
          { value: PlayerRole.Striker, label: PlayerRole.Striker },
          { value: PlayerRole.Master, label: PlayerRole.Master },
        ];
      },
    },
  },
  {
    dataField: 'email',
    text: 'Email',
    headerStyle: (column, colIndex) => ({ width: '20%' }),
    headerClasses: 'player-table-header-element',
    autoSelectText: true,
    hidden: !isAdmin,
    filter: textFilter({
      placeholder: 'Filtra...',
      getFilter: (filter) => (emailFilter = filter),
    }),
  },
  {
    dataField: 'phone',
    headerStyle: (column, colIndex) => ({ width: '10%' }),
    text: 'Telefono',
    headerClasses: 'player-table-header-element',
    autoSelectText: true,
    hidden: !isAdmin,
    filter: textFilter({
      placeholder: 'Filtra...',
      getFilter: (filter) => (phoneFilter = filter),
    }),
  },
  { dataField: 'match_played', text: 'Partite Giocate', hidden: true },
  { dataField: 'match_won', text: 'Vittorie', hidden: true },
  { dataField: 'total_score', text: 'Punteggio', hidden: true },
];

export default playerColumns;

// Custom export button
export const ExportCSVButton = (props) => (
  <Button disabled className="btn btn-success" onClick={() => props.onExport()}>
    Esporta in CSV
  </Button>
);

export const fetchPlayers = (setterFunction, tId) => {
  (async () => {
    const response = await fetch(tId ? `/api/v1/player/list/${tId}` : '/api/v1/player/list', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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
