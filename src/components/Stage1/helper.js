import React from 'react';
import PairSelect from '../Pair/select';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

export const newColumn = (index, onChange) => {
  return {
    id: `col${index}`,
    dataField: `col${index}`,
    text: index.toString(),
    headerAlign: (column, colIndex) => 'center',
    editable: (content, row, rowIndex, columnIndex) => rowIndex !== columnIndex - 2,
    align: (cell, row, rowIndex, colIndex) => 'center',
    style: (content, row, rowIndex, columnIndex) => {
      if (rowIndex === columnIndex - 2) return { backgroundColor: '#6d706e' };
      if (parseInt(content, 10) === 3 || parseInt(content, 10) === 2) return { backgroundColor: 'rgb(196, 247, 160)' };
      if (parseInt(content, 10) === 1 || parseInt(content, 10) === 0) return { backgroundColor: 'rgb(255, 147, 147)' };
      return null;
    },
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

export function rowsGenerator(pairsList) {
  let rows = [];
  for (let ii = 0; ii < pairsList.length; ii++) {
    rows.push({ pair: pairsList[ii], rowNumber: ii + 1 });
    for (let jj = 1; jj <= pairsList.length; jj++) {
      rows[ii][`col${jj}`] = null;
    }
    rows[ii]['total'] = 0;
    rows[ii]['place'] = 0;
    rows[ii]['id'] = `row-${pairsList[0].tId}-${ii}`;
  }
  //console.log(rows);
  return rows;
}

export const columns = (onSelect, pairsList) => {
  /**
   * TODO: aggiungere id su tutte le colonne
   *
   *     id: 'punteggio',
   *     dataField: 'punteggio',
   *     text: 'Punteggio',
   *
   *
   */
  let baseColumns = [
    {
      // Nome Coppia ( In realta contiene un oggetto di tipo Pair)
      id: 'pairLabel',
      dataField: 'pair.label',
      text: 'Nome Coppia',
      editable: false,
      align: (cell, row, rowIndex, colIndex) => 'center',
      headerAlign: (column, colIndex) => 'center',
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
      id: 'rowNumber',
      dataField: 'rowNumber',
      text: 'ID',
      editable: false,
      headerAlign: (column, colIndex) => 'center',
      style: (content, row, rowIndex, columnIndex) => {
        return { backgroundColor: '#f9ffdb' };
      }
    }
  ];

  // generazione dinamica colonne intermedie
  for (let ii = 0; ii < pairsList.length; ii++) {
    baseColumns.push(newColumn(ii + 1));
  }

  baseColumns.push(
    {
      // Totale coppia
      id: 'totale',
      dataField: 'total',
      text: 'Totale',
      editable: false,
      headerAlign: (column, colIndex) => 'center'
    },
    {
      // Posizionamento coppia
      id: 'place',
      dataField: 'place',
      text: 'Posizione',
      editable: false,
      headerAlign: (column, colIndex) => 'center'
    }
  );
  return baseColumns;
};

export const cellEditProps = cellEditFactory({
  mode: 'click',
  blurToSave: true
});

// TODO:
function useAsyncHook(searchBook) {
  const [result, setResult] = React.useState([]);
  const [loading, setLoading] = React.useState('false');

  React.useEffect(() => {
    async function fetchBookList() {
      try {
        setLoading('true');
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchBook}`);

        const json = await response.json();
        // console.log(json);
        setResult(
          json.items.map(item => {
            console.log(item.volumeInfo.title);
            return item.volumeInfo.title;
          })
        );
      } catch (error) {
        setLoading('null');
      }
    }

    if (searchBook !== '') {
      fetchBookList();
    }
  }, [searchBook]);

  return [result, loading];
}
