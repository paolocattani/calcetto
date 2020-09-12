import React from 'react';
import { Button } from 'react-bootstrap';
import filterTableFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { Type } from 'react-bootstrap-table2-editor';
import { PlayerRole } from '@common/dto';
import cellEditFactory from 'react-bootstrap-table2-editor';

// Filter
let nameFilter;
let surnameFilter;
let aliasFilter;
let roleFilter;
let emailFilter;
let phoneFilter;

export function clearAllFilter(isAdmin, labels) {
  nameFilter('');
  surnameFilter('');
  aliasFilter('');
  roleFilter('');
  if (isAdmin) {
    emailFilter('');
    phoneFilter('');
  }
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
const playerColumns = (isAdmin, labels) => [
  { dataField: 'rowNumber', text: 'ID', editable: false, headerStyle: (column, colIndex) => ({ width: '3%' }) },
  {
    dataField: 'name',
    text: labels.name,
    headerClasses: 'player-table-header-element',
    autoSelectText: true,
    headerStyle: (column, colIndex) => ({ width: isAdmin ? '16%' : '25%' }),
    filter: textFilter({
      placeholder: `${labels.filter}...`,
      getFilter: (filter) => (nameFilter = filter),
    }),
  },
  {
    dataField: 'surname',
    text: labels.surname,
    headerClasses: 'player-table-header-element',
    autoSelectText: true,
    headerStyle: (column, colIndex) => ({ width: isAdmin ? '16%' : '25%' }),
    filter: textFilter({
      placeholder: `${labels.filter}...`,
      getFilter: (filter) => (surnameFilter = filter),
    }),
  },
  {
    dataField: 'alias',
    text: labels.alias,
    headerClasses: 'player-table-header-element',
    headerStyle: (column, colIndex) => ({ width: isAdmin ? '17%' : '25%' }),
    autoSelectText: true,
    filter: textFilter({
      placeholder: `${labels.filter}...`,
      getFilter: (filter) => (aliasFilter = filter),
    }),
  },
  {
    dataField: 'role',
    text: labels.role,
    headerClasses: 'player-table-header-element',
    headerStyle: (column, colIndex) => ({ width: `${isAdmin ? '11' : '15'}%` }),
    filter: selectFilter({
      placeholder: `${labels.filter}...`,
      options: {
        [PlayerRole.GoalKeeper]: labels.goalKeeper,
        [PlayerRole.Striker]: labels.striker,
        [PlayerRole.Master]: labels.master,
      },
      getFilter: (filter) => (roleFilter = filter),
    }),
    editor: {
      type: Type.SELECT,
      getOptions: () => {
        return [
          { value: PlayerRole.GoalKeeper, label: labels.goalKeeper },
          { value: PlayerRole.Striker, label: labels.striker },
          { value: PlayerRole.Master, label: labels.master },
        ];
      },
    },
  },
  {
    dataField: 'email',
    text: labels.email,
    headerStyle: (column, colIndex) => ({ width: '20%' }),
    headerClasses: 'player-table-header-element',
    autoSelectText: true,
    hidden: !isAdmin,
    filter: textFilter({
      placeholder: `${labels.filter}...`,
      getFilter: (filter) => (emailFilter = filter),
    }),
  },
  {
    dataField: 'phone',
    headerStyle: (column, colIndex) => ({ width: '10%' }),
    text: labels.phone,
    headerClasses: 'player-table-header-element',
    autoSelectText: true,
    hidden: !isAdmin,
    filter: textFilter({
      placeholder: `${labels.filter}...`,
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
