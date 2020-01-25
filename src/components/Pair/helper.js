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
  blurToSave: true,
  afterSaveCell: (oldValue, newValue, row, column) => {
    console.log('AfterSaveCell', oldValue, newValue);
    console.log('AfterSaveCell', row, column);
    /* TODO: gestire aggiornaemento DB
        (async () => {
          const response = await fetch('/api/player', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(row)
          });
          const result = await response.json();
          console.table(result);
        })();
        */
  }
});

export const emptyRow = id => {
  return {
    id: null,
    tid: id,
    pair1: { id: null, alias: '', name: '', surname: '' },
    pair2: { id: null, alias: '', name: '', surname: '' }
  };
};
