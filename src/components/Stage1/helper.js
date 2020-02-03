import React from 'react';
import PairSelect from '../Pair/select';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

export const newColumn = (index, onChange) => {
  return {
    dataField: `col.${index}`,
    text: index,
    editable: (content, row, rowIndex, columnIndex) => rowIndex !== columnIndex - 2,
    style: (cell, row, rowIndex, columnIndex) => (rowIndex === columnIndex - 2 ? { backgroundColor: '#6d706e' } : null),
    editor: {
      type: Type.SELECT,
      options: [
        { value: '3', label: '3' },
        { value: '2', label: '2' },
        { value: '1', label: '1' },
        { value: '0', label: '0' }
      ]
    }
  };
};

export function rowsGenerator(columnsNumber, rowNumber) {
  let rows = [];
  for (let ii = 0; ii < rowNumber; ii++) {
    rows.push({ pair: 5, rowNumber: ii });
    for (let jj = 1; jj <= columnsNumber; jj++) {
      rows[ii][`col.${jj}`] = '';
    }
    rows[ii]['total'] = 0;
    rows[ii]['place'] = 0;
  }
  return rows;
}

export const columns = (onSelect, tId, rowNumber) => {
  let baseColumns = [
    {
      dataField: 'pair',
      text: 'Nome Coppia',
      editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
        <PairSelect
          {...editorProps}
          id={columnIndex}
          row={row}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          value={value}
          onSelect={onSelect}
          tId={tId}
        />
      )
    },
    {
      dataField: 'rowNumber',
      text: 'ID',
      editable: false
    }
  ];

  // generazione dinamica colonne intermedie
  for (let ii = 0; ii < rowNumber; ii++) {
    baseColumns.push(newColumn(ii + 1));
  }

  baseColumns.push(
    {
      dataField: 'total',
      text: 'Totale',
      editable: false
    },
    {
      dataField: 'place',
      text: 'Posizione',
      editable: false
    }
  );
  return baseColumns;
};

export const cellEditProps = cellEditFactory({
  mode: 'dbclick',
  blurToSave: true
});
