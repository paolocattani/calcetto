import React from 'react';
import PairSelect from '../Pair/select';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

export const newColumn = (index, onChange) => {
  return {
    dataField: `col${index}`,
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

export function rowsGenerator(columnsNumber, pairsList) {
  let rows = [];
  for (let ii = 0; ii < pairsList.length; ii++) {
    rows.push({ pair: pairsList[ii], rowNumber: ii + 1 });
    for (let jj = 1; jj <= pairsList.length; jj++) {
      rows[ii][`col${jj}`] = '';
    }
    rows[ii]['total'] = 0;
    rows[ii]['place'] = 0;
  }
  //console.log(rows);
  return rows;
}

export const columns = (onSelect, pairsList) => {
  let baseColumns = [
    {
      // Nome Coppia ( In realta contiene un oggetto di tipo Pair)
      dataField: 'pair.label',
      text: 'Nome Coppia',
      editable: false,
      editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
        <PairSelect
          {...editorProps}
          id={columnIndex}
          row={row}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          value={value}
          onSelect={onSelect}
          tId={pairsList[0].tId}
        />
      )
    },
    {
      // Numbero riga per riferimento visivo
      dataField: 'rowNumber',
      text: 'ID',
      editable: false
    }
  ];

  // generazione dinamica colonne intermedie
  for (let ii = 0; ii < pairsList.length; ii++) {
    baseColumns.push(newColumn(ii + 1));
  }

  baseColumns.push(
    {
      // Totale coppia
      dataField: 'total',
      text: 'Totale',
      editable: false
    },
    {
      // Posizionamento coppia
      dataField: 'place',
      text: 'Posizione',
      editable: false
    }
  );
  return baseColumns;
};

export const cellEditProps = cellEditFactory({
  mode: 'click',
  blurToSave: true
});
