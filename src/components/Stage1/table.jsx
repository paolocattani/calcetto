import React, { useState, useEffect, useCallback } from 'react';
// table
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
// helper

import TableHeader from './header';
import { getOpposite } from './helper';

// style
import './style.css';

const Stage1Table = ({ rows, columns, tableName, updateCellValue }) => {
  /**
   * L'idea di base è che al primo giro rows sarà vuoto e viene popolato con gli eventuali dati presi da db.
   * Le esecuzioni successive serviranno a aggiornare i dati sul db.
   *
   * useCallback fa in modo che l'effetto nel quale è definat la funzione ( updateRows )
   * non sia ( erroneamente ) eseguito ad ogni re-render.
   *
   * https://github.com/facebook/react/issues/15858
   */

  // dummy data
  /*
  let rowIndex = 3;
  let colIndex = 1;
  rows[rowIndex][`col${colIndex}`] = 3;
*/
  const cellEditProps = cellEditFactory({
    mode: 'click',
    blurToSave: true,
    beforeSaveCell: () => {
      if (tableName === '1') console.log('Before save');
    },
    afterSaveCell: (oldValue, newValue, row, column) => {
      if (tableName === '1') {
        console.log('After save rows: ', rows);
        console.log('After save column: ', column);
        console.log('After save ROW: ', row);
      }
      updateCellValue(oldValue, newValue, row, column);
      rows[parseInt(column.text) - 1][`col${row.rowNumber}`] = getOpposite(newValue);
      rows[row.rowNumber - 1]['total'] = rows[row.rowNumber - 1]['total']
        ? rows[row.rowNumber - 1]['total'] + newValue
        : newValue;
      rows[parseInt(column.text) - 1]['total'] = rows[parseInt(column.text) - 1]['total']
        ? rows[parseInt(column.text) - 1]['total'] + getOpposite(newValue)
        : getOpposite(newValue);
    }
  });

  if (tableName === '1') console.log('Rendering table ', tableName, rows);
  return (
    <BootstrapTable
      bootstrap4
      keyField="id"
      data={rows}
      columns={columns}
      cellEdit={cellEditProps}
      noDataIndication="Nessun dato reperito"
      wrapperClasses="player-table"
      headerClasses="player-table-header"
      caption={<TableHeader title={tableName} />}
      striped
      hover
    />
  );
};

export default Stage1Table;
