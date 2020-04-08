import React, { useState } from 'react';
// table
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
// helper

import TableHeader from './header';
import { getOpposite, comparator } from './helper';
import { SessionContext } from '../core/routing/SessionContext';

// style
import './style.css';

const Stage1Table = ({ rows, columns, tableName, updateCellValue, saved }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const cellEditProps = editable =>
    cellEditFactory({
      mode: editable ? 'click' : 'none',
      blurToSave: true,
      beforeSaveCell: (oldValue, newValue, row, column) => {
        if (column.id.startsWith('col')) {
          // Aggiorno cella opposta
          rows[parseInt(column.text) - 1][`col${row.rowNumber}`] = getOpposite(newValue);
        }
      },
      afterSaveCell: (oldValue, newValue, row, column) => {
        if (column.id.startsWith('col')) {
          // Aggiorno dati sul Db
          updateCellValue(oldValue, newValue, row, column);

          // Ricalcolo totali riga
          let acc = 0;
          for (let key in row) if (key.startsWith('col') && row[key]) acc += parseInt(row[key]);
          rows[row.rowNumber - 1]['total'] = acc ? acc : null;

          //... e riga opposta
          acc = 0;
          for (let key in rows[parseInt(column.text) - 1])
            if (key.startsWith('col') && rows[parseInt(column.text) - 1][key])
              acc += parseInt(rows[parseInt(column.text) - 1][key]);
          rows[parseInt(column.text) - 1]['total'] = acc ? acc : null;
        }
        // Aggiorno posizione relativa
        [...rows]
          .sort((e1, e2) => comparator(e1, e2))
          .forEach((row, index) => (rows[row.rowNumber - 1]['place'] = index + 1));
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

  return (
    <SessionContext.Consumer>
      {([session]) => (
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={rows}
          columns={columns}
          selectRow={selectRow}
          cellEdit={cellEditProps(session.isEditable)}
          noDataIndication="Nessun dato reperito"
          wrapperClasses="player-table"
          headerClasses="player-table-header"
          caption={<TableHeader title={tableName} saved={saved} />}
          striped
          hover
        />
      )}
    </SessionContext.Consumer>
  );
};

export default Stage1Table;
