import React from 'react';
import cellEditFactory from 'react-bootstrap-table2-editor';
import PlayerSelect from '../Player/select';

export const columns = onSelect => [
  { dataField: 'id', text: 'ID', editable: false },
  {
    dataField: 'pair1.alias',
    text: 'Giocatore 1',
    editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
      <PlayerSelect
        {...editorProps}
        id={columnIndex}
        row={row}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        value={value}
        onSelect={onSelect}
      />
    )
  },
  {
    dataField: 'pair2.alias',
    text: 'Giocatore 2',
    editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
      <PlayerSelect
        {...editorProps}
        id={columnIndex}
        row={row}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        value={value}
        onSelect={onSelect}
      />
    )
  }
];

export const cellEditProps = cellEditFactory({
  mode: 'click',
  blurToSave: true
});

export function getEmptyRowModel() {
  return {
    id: null,
    tId: null,
    pair1: { id: null, alias: '', name: '', surname: '' },
    pair2: { id: null, alias: '', name: '', surname: '' }
  };
}

export const fetchPairs = (setterFunction, tournamentId) => {
  (async () => {
    const response = await fetch(`/api/player/list/${tournamentId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    setterFunction(result);
  })();
};

export function valueFormatter(selectedOption) {
  // ' 1 : Pool - Gilbe '
  let value = `${selectedOption.id} : `;
  const { player1, player2 } = selectedOption;
  value += player1.alias ? player1.alias : player1.name;
  value += ' - ' + player2.alias ? player2.alias : player2.name;
  return value;
}
