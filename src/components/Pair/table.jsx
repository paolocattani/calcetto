import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { columns, cellEditProps, getEmptyRowModel, fetchPairs, getEmptyPlayer /* checkEditable */ } from './helper';
import { useParams, useHistory } from 'react-router';
import './style.css';

const PairsTable = _ => {
  const [rows, setRows] = useState([] /*PairsGenerator()*/);
  const [selectedRows, setSelectedRows] = useState([]);
  const [allertMessage, setAllertMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  //const [isEditable, setIsEditable] = useState(false); // TODO:
  const [isLoading, setIsLoading] = useState(false); // FIXME:
  const { tId } = useParams();
  let currentHistory = useHistory();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => checkEditable(setIsEditable, tId), []);
  useEffect(() => fetchPairs(setIsLoading, setRows, tId), [tId]);

  function addRow() {
    (async () => {
      setIsLoading(true);
      const emptyRow = getEmptyRowModel();
      emptyRow.tId = tId;
      const response = await fetch('/api/pair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emptyRow)
      });
      const result = await response.json();
      emptyRow.id = result.id;
      emptyRow.rowNumber = rows.length + 1;
      setRows(rows => [emptyRow, ...rows]);
      setIsLoading(false);
      return false;
    })();
  }

  function deleteRow() {
    (async () => {
      setIsLoading(true);
      const emptyRow = getEmptyRowModel();
      const response = await fetch('/api/pair', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedRows)
      });
      const result = await response.json();
      emptyRow.id = result.id;
      setRows(rows => rows.filter(row => !selectedRows.find(selectedRow => selectedRow.id === row.id)));
      setIsLoading(false);
      return false;
    })();
  }

  function goBack() {
    currentHistory.push('/');
  }
  // Aggiorno la colonna con il giocatore selezionato
  const onSelect = (selectedElement, rowIndex, columnIndex) => {
    setRows(rows =>
      rows.map(rowElement => {
        if (rowElement.id === rowIndex) {
          let row = rowElement;
          if (columnIndex === 1) {
            if (row.player2.id === selectedElement.id) {
              row.player2 = getEmptyPlayer();
              setAllertMessage('Attenzione : Non puoi selezionare lo stesso giocare ! ');
              setTimeout(() => setAllertMessage(''), 5000);
            } else row.player1 = selectedElement;
          } else {
            if (row.player1.id === selectedElement.id) {
              row.player2 = getEmptyPlayer();
              setAllertMessage('Attenzione : Non puoi selezionare lo stesso giocare ! ');
              setTimeout(() => setAllertMessage(''), 5000);
            } else row.player2 = selectedElement;
          }
          // update db
          (async () => {
            console.log('updating : ', row);
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
    const missingRows = rows.filter(e => !e.stage1Name || e.stage1Name === '').map(e => e.rowNumber);
    if (missingRows !== []) {
      setErrorMessage(
        `Assegna  ${missingRows.length === 1 ? 'la riga ' : 'le righe '} ${missingRows} ad un girone per procedere `
      );
      setTimeout(() => setErrorMessage(''), 5000);
    } else currentHistory.push(`/stage1/${tId}`);
  };

  const selectRow = {
    mode: 'checkbox',
    onSelect: handleSelect,
    onSelectAll: (isSelected, rows) => rows.forEach(row => handleSelect(row, isSelected)),
    style: { backgroundColor: '#c8e6c9' }
  };

  //console.log('selectedRows : ', selectedRows);
  console.log(
    ' ',
    rows.filter(e => !e.stage1Name || e.stage1Name === '')
  );
  return isLoading ? (
    <p>Caricamento....</p>
  ) : (
    <>
      {allertMessage && allertMessage !== '' ? (
        <Alert key={'pair-allert-message'} variant={'warning'}>
          {allertMessage}
        </Alert>
      ) : null}
      {errorMessage && errorMessage !== '' ? (
        <Alert key={'pair-allert-message'} variant={'danger'}>
          {errorMessage}
        </Alert>
      ) : null}
      <Button variant="secondary" onClick={goBack}>
        Home
      </Button>
      <Button variant="success" onClick={addRow}>
        Aggiungi Coppia
      </Button>
      <Button variant="danger" onClick={deleteRow}>
        Elimina Coppia
      </Button>
      <Button
        variant="primary"
        onClick={confirmPairs}
        //disabled={rows.filter(e => !e.stage1Name || e.stage1Name === '') != [] ? true : false}
      >
        Conferma coppie
      </Button>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={rows}
        columns={columns(onSelect)}
        cellEdit={cellEditProps}
        selectRow={selectRow}
        noDataIndication={
          <>
            <p>Aggiungi le coppie per questo torneo...</p>
            <Button variant="success" onClick={addRow}>
              Aggiungi Coppia
            </Button>
          </>
        }
        wrapperClasses="player-table"
        headerClasses="player-table-header"
        striped
        hover
      />
    </>
  );
};

export default PairsTable;
