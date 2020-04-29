import { Type } from 'react-bootstrap-table2-editor';

const newColumn = (index, rowNumber) => {
  return {
    id: `col${index}`,
    dataField: `col${index}`,
    text: index.toString(),
    //type: 'number',
    headerStyle: (column, colIndex) => ({ width: `${75 / rowNumber}%` }),
    headerAlign: (column, colIndex) => 'center',
    editable: (content, row, rowIndex, columnIndex) => rowIndex !== columnIndex - 2,
    align: (cell, row, rowIndex, colIndex) => 'center',
    style: (content, row, rowIndex, columnIndex) => {
      if (rowIndex === columnIndex - 2) return { backgroundColor: '#343a40' };
      if (parseInt(content, 10) === 3 || parseInt(content, 10) === 2) return { backgroundColor: 'rgb(196, 247, 160)' };
      if (parseInt(content, 10) === 1 || parseInt(content, 10) === 0) return { backgroundColor: 'rgb(255, 147, 147)' };
      return null;
    },
    /* TODO:
    editorStyle: (cell, row, rowIndex, colIndex) => {
      console.log('editorStyle : ', cell, row, rowIndex, colIndex);
      return { width: '100%', height: 'auto' };
    }, */
    editor: {
      type: Type.SELECT,
      options: [
        { value: '3', label: '3' },
        { value: '2', label: '2' },
        { value: '1', label: '1' },
        { value: '0', label: '0' },
        { value: null, label: '' },
      ],
    },
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
  return rows;
}

export const columns = (pairsList) => {
  let baseColumns = [
    {
      // Nome Coppia ( In realta contiene un oggetto di tipo Pair)
      id: 'pairLabel',
      dataField: 'pair.label',
      text: 'Nome Coppia',
      editable: false,
      headerStyle: (column, colIndex) => ({ width: '15%' }),
      align: (cell, row, rowIndex, colIndex) => 'center',
      headerAlign: (column, colIndex) => 'center',
    },
    {
      // Numbero riga per riferimento visivo
      id: 'rowNumber',
      dataField: 'rowNumber',
      text: 'ID',
      editable: false,
      type: 'number',
      headerStyle: (column, colIndex) => ({ width: '5%' }),
      headerAlign: (column, colIndex) => 'center',
      style: (content, row, rowIndex, columnIndex) => {
        return { backgroundColor: '#343a40', color: '#ffc107' };
      },
    },
  ];

  // generazione dinamica colonne intermedie
  for (let ii = 0; ii < pairsList.length; ii++) baseColumns.push(newColumn(ii + 1, pairsList.length));

  baseColumns.push(
    {
      // Totale coppia
      id: 'totale',
      dataField: 'total',
      text: 'Totale',
      editable: false,
      type: 'number',
      headerStyle: (column, colIndex) => ({ width: '5%' }),
      headerAlign: (column, colIndex) => 'center',
    },
    {
      // Posizionamento coppia
      id: 'place',
      dataField: 'place',
      text: 'Posizione',
      editable: true,
      type: 'number',
      headerStyle: (column, colIndex) => ({ width: '5%' }),
      headerAlign: (column, colIndex) => 'center',
    }
  );
  return baseColumns;
};
