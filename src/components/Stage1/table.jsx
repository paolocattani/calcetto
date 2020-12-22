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
import { AuthSelector } from '../../redux/selectors/auth.selector';
// style
import { Stage1Action } from '../../redux/actions';
import { TournamentSelector,Stage1Selector } from '../../redux/selectors';
import { TournamentProgress } from '../../@common/dto';

// TODO: convert this component to ts
// eslint-disable-next-line sonarjs/cognitive-complexity
const Stage1Table = ({ pairsList, autoOrder }) => {
  const dispatch = useDispatch();
  // Sono presenti aggiornamenti
  const toogleRefresh = useSelector(Stage1Selector.getToogleRefresh);
  // From store
  const isAdmin = useSelector(AuthSelector.isAdmin);
  const tournament = useSelector(TournamentSelector.getTournament);
  // State
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setIsSaved] = useState(false);
  const [rows, setRows] = useState(rowsGenerator(pairsList));
  // Const
  const stageName = pairsList[0].stage1Name;

  // Effects
  useEffect(
    () => {
      const fetchData = async () => {
        setIsLoading(true);
        const response = await fetch('/api/v1/stage1', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rows, stageName }),
        });
        const result = await response.json();
        if (!!autoOrder)
          [...result]
            .sort((e1, e2) => comparator(e1, e2))
            .forEach((row, index) => (result[row.rowNumber - 1]['placement'] = index + 1));

        setRows(result);
        setIsLoading(false);
      };
      fetchData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toogleRefresh]
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
        const newRows = [...rows];
        if (column.id.startsWith('col')) {
          // Aggiorno dati sul Db
          const response = await fetch('/api/v1/stage1/update/cell', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tId: row.pair.tournamentId,
              tableName: stageName,
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
          const thisRowIndex = row.rowNumber - 1;
          const thisRow = newRows[thisRowIndex];
          thisRow.total = acc ? acc : 0;

          //... e riga opposta
          acc = 0;
          const oppositeRowIndex = parseInt(column.text) - 1;
          for (let key in newRows[oppositeRowIndex])
            if (key.startsWith('col') && newRows[oppositeRowIndex][key])
              acc += parseInt(newRows[oppositeRowIndex][key]);
          const oppositeRow = newRows[oppositeRowIndex];
          oppositeRow.total = acc ? acc : 0;

          newRows.splice(thisRowIndex, 1, thisRow);
          newRows.splice(oppositeRowIndex, 1, oppositeRow);
        }
        // Aggiorno posizione relativa
        if (autoOrder)
          [...newRows]
            .sort((e1, e2) => comparator(e1, e2))
            .forEach((s1Row, index) => (newRows[s1Row.rowNumber - 1]['placement'] = index + 1));

        // Aggiornamento
        setRows(newRows);
        dispatch(
          Stage1Action.updatePlacement.request({ rows: rows.map((e) => ({ id: e.pair.id, placement: e.placement })) })
        );
      },
    });

  const handleOnSelect = (row, isSelected) => {
    const found = selectedRows.find((e) => e.rowNumber === row.rowNumber) ? true : false;
    let selected;
    if (isSelected) {
      selected = found ? selectedRows : [row, ...selectedRows];
    } else {
      selected = found ? selectedRows.filter((e) => e.rowNumber !== row.rowNumber) : selectedRows;
    }

    console.log('handleOnSelect : ');
    setSelectedRows(selected);
    dispatch(
      Stage1Action.updateSelectedPairs.request({
				stage1Name: stageName,
				stage1Rows: selected,
      })
    );
    return true;
  };

  const handleOnSelectAll = (isSelected, s1Rows) => {
    setSelectedRows(isSelected ? s1Rows : []);
    dispatch(
      Stage1Action.updateSelectedPairs.request({
				stage1Name:stageName,
				stage1Rows: isSelected ? s1Rows : [],
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

  console.log('Refreshing : ', toogleRefresh);
  return isLoading ? (
    <h3>
      Caricamento girone <b>{stageName}</b> in corso....
    </h3>
  ) : (
    <BootstrapTable
      key={`Stege1-${stageName}`}
      bootstrap4
      keyField="id"
      data={rows}
      columns={columns(pairsList)}
      selectRow={selectRow}
      cellEdit={cellEditProps(isAdmin && tournament.progress < TournamentProgress.Stage2)}
      noDataIndication="Nessun dato reperito"
      headerClasses="default-background default-color-yellow"
      caption={<TableHeader title={stageName} saved={saved} />}
      striped
      hover
    />
  );
};

export default Stage1Table;
