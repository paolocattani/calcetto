import React from 'react';
import cellEditFactory from 'react-bootstrap-table2-editor';
import PlayerSelect from '../Player/select';

export const columns = onSelect => [
  { dataField: 'id', text: 'ID', editable: false },
  {
    dataField: 'pair1.alias',
    text: 'Nome1',
    editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
      <PlayerSelect {...editorProps} value={value} onSelect={onSelect} />
    )
  },
  {
    dataField: 'pair2.alias',
    text: 'Nome2',
    editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
      <PlayerSelect {...editorProps} value={value} onSelect={onSelect} />
    )
  }
];

export const selectRow = onSelect => {
  return {
    mode: 'checkbox',
    clickToSelect: true,
    hideSelectAll: true,
    onSelect
  };
};

export const cellEditProps = cellEditFactory({
  mode: 'click',
  blurToSave: true,
  afterSaveCell: (oldValue, newValue, row, column) => {
    /*
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
