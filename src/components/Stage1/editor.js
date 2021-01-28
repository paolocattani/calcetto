import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { getOpposite } from './helper';
import { updateCellStage1 } from '../../redux/services/stage1.service';
import { SuccessCodes } from '../../@common/models/HttpStatusCode';
import { comparator } from './helper';

// eslint-disable-next-line sonarjs/cognitive-complexity
export const cellEditProps = (editable, stageName,autoOrder,rows,setRows,updatePlacement,setIsSaved) => cellEditFactory({
			mode: editable ? 'click' : 'none',
			blurToSave: true,
      beforeSaveCell: (oldValue, newValue, row, column) => {
				if (column.id.startsWith('col')) {
					// Aggiorno cella opposta
					rows[parseInt(column.text) - 1][`col${row.rowNumber}`] = getOpposite(newValue);
				}
			},
			afterSaveCell: ( oldValue, newValue, row, column) => {
				const newRows = [...rows];
				if (column.id.startsWith('col')) {
					// Aggiorno dati sul Db
          updateCellStage1({
            tId: row.pair.tournamentId,
            stageName,
            score: newValue,
            pair1Id: row.pair.id,
            pair2Id: rows[parseInt(column.text) - 1].pair.id,
          }).then(response => {
            if (SuccessCodes.includes(response.code)) {
              setIsSaved(true);
              setTimeout(() => setIsSaved(false), 3000);
            }
          });
					// Ricalcolo totali riga
					let acc = 0;
					for (let key in row) {
						if (key.startsWith('col') && row[key]) {
							acc += parseInt(row[key]);
						}
					}
					const thisRowIndex = row.rowNumber - 1;
					const thisRow = newRows[thisRowIndex];
					thisRow.total = acc ? acc : 0;

					//... e riga opposta
					acc = 0;
					const oppositeRowIndex = parseInt(column.text) - 1;
					for (let key in newRows[oppositeRowIndex]) {
						if (key.startsWith('col') && newRows[oppositeRowIndex][key]) {
							acc += parseInt(newRows[oppositeRowIndex][key]);
						}
					}
					const oppositeRow = newRows[oppositeRowIndex];
					oppositeRow.total = acc ? acc : 0;

					newRows.splice(thisRowIndex, 1, thisRow);
					newRows.splice(oppositeRowIndex, 1, oppositeRow);
				}
				// Aggiorno posizione relativa
        if (autoOrder) {
          [...newRows]
            .sort((e1, e2) => comparator(e1, e2))
            .forEach((s1Row, index) => (newRows[s1Row.rowNumber - 1]['placement'] = index + 1));
        }
				// Aggiornamento
        setRows(newRows);
        updatePlacement({ rows: rows.map((e) => ({ id: e.pair.id, placement: e.placement })) });
			},
		});



/*
  non esistono i tipi per react-bootstrap-table2-editor
  quindi lascio tutto quello che riguarda l'edit come .js
*/

const headerAlign = { headerAlign: 'center' };
const align = { align: 'center' };
const newColumn = (index, rowNumber) => {
  return {
    id: `col${index}`,
    dataField: `col${index}`,
    text: index.toString(),
    //type: 'number',
    headerStyle: (column, colIndex) => ({ width: `${75 / rowNumber}%` }),
    ...headerAlign,
    editable: (content, row, rowIndex, columnIndex) => rowIndex !== columnIndex - 2,
    ...align,
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

export const columns = (pairsList) => {
  let baseColumns = [
    {
      // Nome Coppia ( In realta contiene un oggetto di tipo Pair)
      id: 'pairLabel',
      dataField: 'pair.label',
      text: 'Nome Coppia',
      editable: false,
      headerStyle: (column, colIndex) => ({ width: '15%' }),
      ...align,
      ...headerAlign,
    },
    {
      // Numbero riga per riferimento visivo
      id: 'rowNumber',
      dataField: 'rowNumber',
      text: 'ID',
      editable: false,
      type: 'number',
      headerStyle: (column, colIndex) => ({ width: '5%' }),
      ...headerAlign,
      style: (content, row, rowIndex, columnIndex) => {
        return { backgroundColor: '#343a40', color: '#ffc107' };
      },
    },
  ];

  // generazione dinamica colonne intermedie
  for (let ii = 0; ii < pairsList.length; ii++) {
    baseColumns.push(newColumn(ii + 1, pairsList.length));
  }

  baseColumns.push(
    {
      // Totale coppia
      id: 'totale',
      dataField: 'total',
      text: 'Totale',
      editable: false,
      type: 'number',
      headerStyle: (column, colIndex) => ({ width: '5%' }),
      ...headerAlign,
    },
    {
      // Posizionamento coppia
      id: 'placement',
      dataField: 'placement',
      text: 'Posizione',
      editable: true,
      type: 'number',
      headerStyle: (column, colIndex) => ({ width: '5%' }),
      ...headerAlign,
    }
  );
  return baseColumns;
};
