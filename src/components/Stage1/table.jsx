import React, { useState, useEffect } from 'react';
// table
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
// helper
import TableHeader from './header';
import { getOpposite, comparator, rowsGenerator } from './helper';
import { columns } from './editor';
//
import { useSelector, useDispatch } from 'react-redux';
import { SessionSelector } from 'redux/selectors/session.selector';
// style
import { Stage1Action } from 'redux/actions';
import { TournamentSelector } from 'redux/selectors';
import { TournamentProgress } from 'redux/models';

// TODO: convert this component to ts
const Stage1Table = ({ pairsList }) => {
  const dispatch = useDispatch();
  // From store
  const isAdmin = useSelector(SessionSelector.isAdmin);
  const tournament = useSelector(TournamentSelector.getTournament);
  // State
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setIsSaved] = useState(false);
  const [autoOrder, setAutoOrder] = useState(false);
  const [rows, setRows] = useState(rowsGenerator(pairsList));
  // Const
  const tableName = pairsList[0].stage1Name;

  // Effects
  useEffect(
    () => {
      const fetchData = async () => {
        setIsLoading(true);
        const response = await fetch('/api/v1/stage1', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rows, stageName: tableName }),
        });
        const result = await response.json();
        // FIXME: Ordinamento : gestire ordinamento personalizzato
        if (autoOrder)
          [...result]
            .sort((e1, e2) => comparator(e1, e2))
            .forEach((row, index) => (result[row.rowNumber - 1]['placement'] = index + 1));

        setRows(result);
        setIsLoading(false);
      };
      fetchData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
      afterSaveCell: async (oldValue, newValue, row, column) => {
        if (column.id.startsWith('col')) {
          // Aggiorno dati sul Db
          const response = await fetch('/api/v1/stage1/cell', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tId: row.pair.tId,
              tableName,
              score: newValue,
              pair1Id: row.pair.id,
              pair2Id: rows[parseInt(column.text) - 1].pair.id,
            }),
          });
          await response.json();
          if (response.ok) {
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
          }

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
        // Aggiornamento posizione
        dispatch(
          Stage1Action.updatePlacement.request({ rows: rows.map((e) => ({ id: e.pair.id, placement: e.placement })) })
        );
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

  return isLoading ? (
    <h3>
      Caricamento girone <b>{tableName}</b> in corso....
    </h3>
  ) : (
    <BootstrapTable
      key={`Stege1-${tableName}`}
      bootstrap4
      keyField="id"
      data={rows}
      columns={columns(pairsList)}
      selectRow={selectRow}
      cellEdit={cellEditProps(isAdmin)}
      noDataIndication="Nessun dato reperito"
      headerClasses="default-background default-color-yellow"
      caption={<TableHeader title={tableName} saved={saved} />}
      striped
      hover
    />
  );
};

export default Stage1Table;
