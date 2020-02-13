import React, { useState, useEffect, useCallback } from 'react';
// table
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
// helper

import TableHeader from './header';
import { getOpposite, comparator } from './helper';

// style
import './style.css';

const Stage1Table = ({ rows, columns, tableName, updateCellValue, saved }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const cellEditProps = cellEditFactory({
    mode: 'click',
    blurToSave: true,
    beforeSaveCell: (oldValue, newValue, row, column) => {
      if (tableName === '1') console.log('Before save');
      // Aggiorno cella opposta
      rows[parseInt(column.text) - 1][`col${row.rowNumber}`] = getOpposite(newValue);
      // Aggiorno totali
      rows[row.rowNumber - 1]['total'] = rows[row.rowNumber - 1]['total']
        ? rows[row.rowNumber - 1]['total'] + newValue
        : newValue;
      rows[parseInt(column.text) - 1]['total'] = rows[parseInt(column.text) - 1]['total']
        ? rows[parseInt(column.text) - 1]['total'] + getOpposite(newValue)
        : getOpposite(newValue);
      // Aggiorno posizione relativa
      [...rows]
        .sort((e1, e2) => comparator(e1, e2))
        .forEach((row, index) => (rows[row.rowNumber - 1]['place'] = index + 1));
    },
    afterSaveCell: (oldValue, newValue, row, column) => {
      // Aggiorno dati sul Db
      updateCellValue(oldValue, newValue, row, column);
    }
  });

  const handleOnSelect = (row, isSelected) => {
    setSelectedRows(() => {
      const found = selectedRows.find(e => e.rowNumber === row.rowNumber) ? true : false;
      if (isSelected) {
        return found ? selectedRows : [row, ...selectedRows];
      } else {
        return found ? selectedRows.filter(e => e.rowNumber !== row.rowNumber) : selectedRows;
      }
    });
    // return true or dont return to approve current select action
    return true;
  };

  const selectRow = {
    mode: 'checkbox',
    onSelect: handleOnSelect,
    onSelectAll: (isSelected, rows) => rows.forEach(row => handleOnSelect(row, isSelected)),
    style: { backgroundColor: '#c8e6c9' }
  };

  if (tableName === '1') {
    console.log('Rendering table ', tableName, rows);
    console.log('SelectedRows : ', selectedRows);
  }
  return (
    <>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={rows}
        columns={columns}
        selectRow={selectRow}
        cellEdit={cellEditProps}
        noDataIndication="Nessun dato reperito"
        wrapperClasses="player-table"
        headerClasses="player-table-header"
        caption={<TableHeader title={tableName} saved={saved} />}
        striped
        hover
      />
    </>
  );
};

export default Stage1Table;
