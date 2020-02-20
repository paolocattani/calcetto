import React, { useState, useEffect } from 'react';
import { Button, Alert, ListGroup } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { columns, cellEditProps, getEmptyRowModel, fetchPairs, getEmptyPlayer /* checkEditable */ } from './helper';
import { fetchPlayers } from '../Player/helper';
import { useParams, useHistory } from 'react-router';
import TableHeader from './header';
import NoData from './noData';
import Loading from '../core/Loading';
import './style.css';

const PairsTable = _ => {
  const [rows, setRows] = useState([] /*PairsGenerator()*/);
  const [options, setOptions] = useState([] /*PairsGenerator()*/);
  const [selectedRows, setSelectedRows] = useState([]);
  const [allertMessage, setAllertMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const [saved, setSaved] = useState(false);

  // const [isEditable, setIsEditable] = useState(false); // TODO:
  const [isLoading, setIsLoading] = useState(false); // FIXME:
  const { tId } = useParams();
  let currentHistory = useHistory();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => checkEditable(setIsEditable, tId), []);
  useEffect(() => {
    fetchPairs(setRows, tId);
    fetchPlayers(setOptions);
  }, [tId]);

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
    })();
  }

  function updateOptions(player, selected) {
    console.log('updating options ', player);
    if (player.id) {
      const opts = options.find(e => e.id === player.id);
      console.log('opts : ', opts);
      if (opts && opts.length === 0) {
        console.log('found player : ', player);
        setOptions(current => [...current, player]);
      }
    } else {
      console.log('deleting player : ', selected);
      setOptions(
        options.splice(
          options.findIndex(e => e.id === selected.id),
          1
        )
      );
    }
    console.log('option updated : ', options);
  }
  // Aggiorno la colonna con il giocatore selezionato
  const onSelect = (selectedElement, rowIndex, columnIndex) => {
    const newRowsElement = rows.map(rowElement => {
      if (rowElement.id === rowIndex) {
        let row = rowElement;
        if (columnIndex === 1) {
          if (row.player2.id === selectedElement.id) {
            // Devo salvare l'elemnto che sto per sostituire
            row.player1 = getEmptyPlayer();
            setAllertMessage('Attenzione : Non puoi selezionare lo stesso giocare ! ');
            setTimeout(() => setAllertMessage(''), 5000);
          } else {
            // Aggiorno la lista dei giocatori disponibili prima di aggiornare i dati
            updateOptions(row.player1, selectedElement);
            row.player1 = selectedElement;
          }
        } else {
          if (row.player1.id === selectedElement.id) {
            row.player2 = getEmptyPlayer();
            setAllertMessage('Attenzione : Non puoi selezionare lo stesso giocare ! ');
            setTimeout(() => setAllertMessage(''), 5000);
          } else {
            updateOptions(row.player2, selectedElement);
            row.player2 = selectedElement;
          }
        }
        // update Db. Non aspetto la risposta...
        fetch('/api/pair', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(row)
        });
        return row;
      } else return rowElement;
    });

    setRows(newRowsElement);
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
    // Controllo gironi non assegnati
    const missingStage1Name = rows.filter(e => !e.stage1Name || e.stage1Name === '').map(e => e.rowNumber);
    if (missingStage1Name.length !== 0) {
      setErrorMessage(
        `Assegna  ${
          missingStage1Name.length === 1 ? 'la riga ' : 'le righe '
        } ${missingStage1Name} ad un girone per procedere `
      );
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    // Controllo coppie non assegnate
    const missingPairs = rows.filter(e => e.player1.id === null || e.player2.id === null).map(e => e.rowNumber);
    if (missingPairs.length !== 0) {
      setErrorMessage(
        `Assegna  i giocatori ${
          missingPairs.length === 1 ? 'alla riga ' : 'alle righe '
        } ${missingPairs} ad un girone per procedere `
      );
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    if (!tId) {
      setErrorMessage('Id torneo mancante. Verrai inviato alla Home tra 5 secondi....');
      setTimeout(() => {
        setErrorMessage('');
        currentHistory.push('/');
      }, 5000);
    }

    // Controllo che non ci siano gironi con meno di 1 coppia ( meglio spostare 3 )
    const MIN_PAIR_PER_STAGE = 3;
    let invalidStage = [];
    const pairsInStage = rows.reduce((allNames, row) => {
      if (row.stage1Name in allNames) allNames[row.stage1Name]++;
      else allNames[row.stage1Name] = 1;
      return allNames;
    }, {});
    for (let stageName in pairsInStage) {
      if (pairsInStage[stageName] <= MIN_PAIR_PER_STAGE) invalidStage.push(stageName);
    }
    if (invalidStage.length > 0) {
      setErrorMessage(
        invalidStage.length === 1
          ? `Il torneo ${invalidStage} deve contenere almeno ${MIN_PAIR_PER_STAGE + 1} coppie`
          : `I torneI ${invalidStage} devono contenere almeno ${MIN_PAIR_PER_STAGE + 1} coppie`
      );
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    // Stage1
    currentHistory.push(`/stage1/${tId}`);
  };

  function goBack() {
    currentHistory.push('/');
  }

  const selectRow = {
    mode: 'checkbox',
    onSelect: handleSelect,
    onSelectAll: (isSelected, rows) => rows.forEach(row => handleSelect(row, isSelected)),
    style: { backgroundColor: '#c8e6c9' }
  };

  function deleteStage1() {
    (async () => {
      setIsLoading(true);
      const emptyRow = getEmptyRowModel();
      const response = await fetch('/api/stage1', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tId })
      });
      const result = await response.json();
      setIsLoading(false);
    })();
  }

  console.log('render table : ', options);
  return (
    <>
      <Loading show={isLoading} message={'Caricamento'} />
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
      <ListGroup horizontal>
        <Button variant="secondary" onClick={goBack}>
          Home
        </Button>
        <Button variant="success" onClick={addRow}>
          Aggiungi Coppia
        </Button>
        <Button variant="danger" onClick={deleteRow}>
          Elimina Coppia
        </Button>
        <Button variant="danger" onClick={deleteStage1}>
          Reset gironi
        </Button>
        <Button variant="primary" onClick={confirmPairs}>
          Conferma coppie
        </Button>
      </ListGroup>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={rows}
        columns={columns(onSelect, options)}
        cellEdit={cellEditProps}
        selectRow={selectRow}
        noDataIndication={<NoData addRow={addRow} />}
        caption={<TableHeader tournametId={tId} />}
        wrapperClasses="player-table"
        headerClasses="player-table-header"
        striped
        hover
      />
    </>
  );
};

export default PairsTable;
