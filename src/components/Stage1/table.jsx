import React, { useState } from 'react';
// table
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
// helper
import TableHeader from './header';
import { getOpposite, comparator } from './helper';
//
import { useSelector, useDispatch } from 'react-redux';
import { SessionSelector } from 'selectors/session.selector';
// style
import { Stage1Action } from 'actions';
import { TournamentSelector } from 'selectors';
import { TournamentProgress } from 'models';

// TODO: convert this component to ts
const Stage1Table = ({ rows, columns, tableName, updateCellValue, autoOrder, updatePlacement, saved }) => {
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);
  const isAdmin = useSelector(SessionSelector.isAdmin);
  const tournament = useSelector(TournamentSelector.getTournament);

  const cellEditProps = (editable) =>
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
          rows[row.rowNumber - 1]['total'] = acc ? acc : 0;
          console.log('Row : ', rows[row.rowNumber - 1]);
          //... e riga opposta
          acc = 0;
          for (let key in rows[parseInt(column.text) - 1])
            if (key.startsWith('col') && rows[parseInt(column.text) - 1][key])
              acc += parseInt(rows[parseInt(column.text) - 1][key]);
          rows[parseInt(column.text) - 1]['total'] = acc ? acc : 0;
          console.log('Opposite : ', rows[parseInt(column.text) - 1]);
        }
        // Aggiorno posizione relativa
        if (autoOrder)
          [...rows]
            .sort((e1, e2) => comparator(e1, e2))
            .forEach((row, index) => (rows[row.rowNumber - 1]['placement'] = index + 1));
        updatePlacement(rows);
      },
    });

  const handleOnSelect = (row, isSelected) => {
    console.log('handleOnSelect : ', row);
    const found = selectedRows.find((e) => e.rowNumber === row.rowNumber) ? true : false;
    let selected;
    if (isSelected) {
      selected = found ? selectedRows : [row, ...selectedRows];
    } else {
      selected = found ? selectedRows.filter((e) => e.rowNumber !== row.rowNumber) : selectedRows;
    }
    console.log('Selected : ', selected);

    setSelectedRows(selected);
    dispatch(
      Stage1Action.setSelectedPairs({
        stageName: tableName,
        rows: selected,
      })
    );
    return true;
  };

  const handleOnSelectAll = (isSelected, rows) => {
    setSelectedRows(isSelected ? rows : []);
    dispatch(
      Stage1Action.setSelectedPairs({
        stageName: tableName,
        rows: isSelected ? rows : [],
      })
    );
  };

  const selectRow = {
    mode: 'checkbox',
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
    style: { backgroundColor: '#c8e6c9' },
    hideSelectColumn: !isAdmin || tournament.progress >= TournamentProgress.Stage2,
  };

  console.log(' render : ', tableName, rows);

  return (
    <BootstrapTable
      key={`Stege1-${tableName}`}
      bootstrap4
      keyField="id"
      data={rows}
      columns={columns}
      selectRow={selectRow}
      cellEdit={cellEditProps(isAdmin)}
      noDataIndication="Nessun dato reperito"
      //wrapperClasses="player-table"
      headerClasses="default-background default-color-yellow"
      caption={<TableHeader title={tableName} saved={saved} />}
      striped
      hover
    />
  );
};

export default Stage1Table;
