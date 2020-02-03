import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { columns, cellEditProps, getEmptyRowModel, fetchPairs /* checkEditable */ } from './helper';
import { useParams, useHistory } from 'react-router';
import './style.css';

const PairsTable = props => {
  const [rows, setRows] = useState([] /*PairsGenerator()*/);
  const [selectedRows, setSelectedRows] = useState([]);

  const [isEditable, setIsEditable] = useState(false); // TODO:
  const [isLoading, setIsLoading] = useState(false); // FIXME:
  const { tId } = useParams();
  let currentHistory = useHistory();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => checkEditable(setIsEditable, tId), []);
  useEffect(() => fetchPairs(setRows, tId), [tId]);

  function addRow() {
    setIsLoading(() =>
      (async () => {
        const emptyRow = getEmptyRowModel();
        emptyRow.tId = tId ? tId : 1;
        const response = await fetch('/api/pair', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emptyRow)
        });
        const result = await response.json();
        emptyRow.id = result.id;
        emptyRow.rowNumber = rows.length + 1;
        setRows(rows => [emptyRow, ...rows]);
        return false;
      })()
    );
  }

  function deleteRow() {
    setIsLoading(() =>
      (async () => {
        const emptyRow = getEmptyRowModel();
        const response = await fetch('/api/pair', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedRows)
        });
        const result = await response.json();
        emptyRow.id = result.id;
        setRows(rows => rows.filter(row => !selectedRows.find(selectedRow => selectedRow.id === row.id)));
        return false;
      })()
    );
  }

  // Aggiorno la colonna con il giocatore selezionato
  const onSelect = (selectedElement, rowIndex, columnIndex) => {
    console.log('onSelect : ', rowIndex, columnIndex);
    setRows(rows =>
      rows.map(rowElement => {
        if (rowElement.id === rowIndex) {
          let row = rowElement;
          if (columnIndex) row.player1 = selectedElement;
          else row.player2 = selectedElement;
          // update db
          (async () => {
            const response = await fetch('/api/pair', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(row)
            });
            await response.json();
          })();
          return row;
        } else return rowElement;
      })
    );
  };

  const handleSelect = (row, isSelected) => {
    setSelectedRows(selectedRows => {
      const found = selectedRows.find(e => e.id === row.id) ? true : false;
      if (isSelected) {
        return found ? selectedRows : [row, ...selectedRows];
      } else {
        return found ? selectedRows.filter(e => e.id !== row.id) : selectedRows;
      }
    });
  };
  const confirmPairs = () => {
    // TODO:
    console.log('pairs confired');
    currentHistory.push(`/stage1/${tId}`);
  };

  const selectRow = {
    mode: 'checkbox',
    onSelect: handleSelect,
    onSelectAll: (isSelected, rows) => rows.forEach(row => handleSelect(row, isSelected)),
    style: { backgroundColor: '#c8e6c9' }
  };

  //console.log('selectedRows : ', selectedRows);
  return (
    <>
      <Button variant="success" onClick={addRow}>
        Aggiungi Coppia
      </Button>
      <Button variant="danger" onClick={deleteRow}>
        Elimina Coppia
      </Button>
      <Button variant="primary" onClick={confirmPairs}>
        Conferma coppie
      </Button>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={rows}
        columns={columns(onSelect)}
        cellEdit={cellEditProps}
        selectRow={selectRow}
        noDataIndication="Nessun dato reperito"
        wrapperClasses="player-table"
        headerClasses="player-table-header"
        striped
        hover
      />
    </>
  );
};

export default PairsTable;
