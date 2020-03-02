import React, { useState, useEffect } from 'react';
import { Button, Alert, ListGroup, InputGroup, FormControl, Row, Col, Collapse, Toast } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { columns, cellEditProps, getEmptyRowModel, fetchPairs, getEmptyPlayer } from './helper';
import { fetchPlayers } from '../Player/helper';
import { useParams, useHistory } from 'react-router';
import TableHeader from './header';
import NoData from './noData';
import { LoadingModal, SuccessToast, WarningToast, ErrorToast } from '../core/Commons';
import { fetchTournament } from '../Tournament/helper';
import './style.css';

const PairsTable = _ => {
  // User messages
  const [isLoading, setIsLoading] = useState({ state: false, message: 'Caricamento' });
  const [successMessage, setSuccessMessage] = useState('');
  const [allertMessage, setAllertMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // Tournament
  const [tournament, setTournament] = useState(null);
  // Table Rows
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  // Players list
  const [options, setOptions] = useState([]);
  // Function params
  const [stage1Number, setStage1Number] = useState(0);
  const [newRowsNumber, setNewRowsNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const { tId } = useParams();
  let currentHistory = useHistory();

  // Initial Fetch
  useEffect(() => {
    fetchPairs(setRows, tId);
    fetchPlayers(setOptions, tId);
    fetchTournament(setTournament, tId);
  }, [tId]);

  function showErrorMessage(message) {
    setIsLoading({ state: false, message });
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 5000);
  }
  function showSuccessMessage(message) {
    setIsLoading({ state: false, message });
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 5000);
  }

  async function addRow() {
    try {
      setIsLoading({ state: true, message: 'Aggiunta riga in corso' });
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
      showSuccessMessage('Riga aggiunta');
    } catch (error) {
      showErrorMessage('Errore aggiunta riga');
    }
  }

  async function addMultipleRows() {
    for (let ii = 0; ii < newRowsNumber; ii++) await addRow();
    setNewRowsNumber(0);
    fetchPairs(setRows, tId);
  }

  async function deleteRow() {
    try {
      setIsLoading({
        state: true,
        message: selectedRows.length > 1 ? 'Cancellazione righe in corso' : 'Cancellazione riga in corso'
      });
      // Devo ripristinare i giocatori eliminati
      let players = [];
      selectedRows.forEach(e => {
        if (e.player1.id) players.push(e.player1);
        if (e.player2.id) players.push(e.player2);
      });
      if (players) setOptions(current => [...players, ...current].sort((e1, e2) => e1.alias.localeCompare(e2.alias)));

      const emptyRow = getEmptyRowModel();
      const response = await fetch('/api/pair', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedRows)
      });
      const result = await response.json();
      emptyRow.id = result.id;
      setRows(rows => rows.filter(row => !selectedRows.find(selectedRow => selectedRow.id === row.id)));
      showSuccessMessage(selectedRows.length > 1 ? 'Righe cancellate' : 'Riga cancellata');
    } catch (error) {
      showErrorMessage('Errore cancellazione riga');
    }
    setSelectedRows([]);
  }

  // update players list when a player is selected
  function updateOptions(player, selected) {
    if (player && player.id)
      if (selected.id)
        setOptions(
          [...options.filter(e => e.id !== selected.id), player].sort((e1, e2) => e1.alias.localeCompare(e2.alias))
        );
      else setOptions([...options, player].sort((e1, e2) => e1.alias.localeCompare(e2.alias)));
    else if (selected.id) setOptions(options.filter(e => e.id !== selected.id));
  }
  // Aggiorno la colonna con il giocatore selezionato
  const onSelect = (selectedElement, rowIndex, columnIndex) => {
    console.log('pair.table.onSelect : ', selectedElement, rowIndex, columnIndex);
    console.log('pair.table.rows : ', rows);
    const newRowsElement = rows.map(rowElement => {
      if (rowElement.id === rowIndex) {
        let row = rowElement;
        if (columnIndex === 1) {
          if (selectedElement.id && row.player2 && row.player2.id === selectedElement.id) {
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
          if (selectedElement.id && row.player1 && row.player1.id === selectedElement.id) {
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
    // Controllo che sia presente almeno una coppia
    if (rows.length < 4) {
      setErrorMessage('Numero di coppie insufficente');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

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
        } ${missingPairs} per procedere `
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

    // Go to Stage1
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

  async function deleteStage1() {
    try {
      setIsLoading({ state: true, message: 'Cancellazione in corso' });
      const response = await fetch('/api/stage1', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tId })
      });
      await response.json();
      showSuccessMessage('Cancellazione completata');
    } catch (error) {
      showErrorMessage('Errore cancellazione Fase 1');
    }
  }

  async function setStage1Name() {
    if (!stage1Number) {
      setErrorMessage('Specificare il numero di gironi da assegnare');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }
    setIsLoading({ state: true, message: 'Aggiornamento in corso' });
    let current = 0;
    const names = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    let newRows = [];
    for (let index in rows) {
      let row = rows[index];
      if (current == stage1Number) current = 0;
      row['stage1Name'] = names[current];
      current++;
      try {
        const response = await fetch('/api/pair', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(row)
        });
        const result = await response.json();
        newRows.push(row);
      } catch (error) {
        showErrorMessage('Errore');
        newRows.push(row);
      }
    }
    showSuccessMessage('Gironi assegnati correttamente');
    setRows(newRows);
  }

  const availableRows =
    Math.floor(
      options.length -
        1 -
        rows.reduce((accumulator, e) => {
          if (!e.player1 && !e.player2) return accumulator + 2;
          if (!e.player1 || !e.player2) return accumulator + 1;
          if (!e.player1.id && !e.player2.id) return accumulator + 2;
          if (!e.player1.id || !e.player2.id) return accumulator + 1;
          return accumulator;
        }, 0)
    ) / 2;

  //  console.log('render table : ', availableRows);
  return (
    <>
      <Row>
        <LoadingModal show={isLoading.state} message={isLoading.message} />
        <Col style={{ margin: '10px' }} md={{ span: 1 }}>
          <Row>
            <ListGroup>
              <ListGroup.Item action variant="primary" onClick={confirmPairs}>
                Prosegui
              </ListGroup.Item>
              <ListGroup.Item action variant="secondary" onClick={goBack}>
                Home
              </ListGroup.Item>
              <ListGroup.Item action variant="success" onClick={addRow} disabled={availableRows <= 0}>
                Aggiungi Coppia
              </ListGroup.Item>
              <ListGroup.Item action variant="danger" onClick={deleteRow} disabled={!(selectedRows.length > 0)}>
                Elimina Coppia
              </ListGroup.Item>
              <ListGroup.Item action variant="danger" onClick={deleteStage1}>
                Reset gironi
              </ListGroup.Item>
            </ListGroup>
          </Row>
        </Col>
        <Col style={{ margin: '10px' }}>
          <Row>
            <InputGroup onChange={e => setStage1Number(e.target.value)}>
              <InputGroup.Prepend>
                <InputGroup.Text>Assegna gironi automaticamente</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder={
                  rows.length < 4
                    ? 'Inserisci almeno 4 coppie'
                    : `Numero di gironi ( max ${Math.floor(rows.length / 4)} )`
                }
                aria-label="Numero di gironi"
                disabled={rows.length < 4}
              />
              <InputGroup.Append>
                <Button
                  variant="primary"
                  onClick={setStage1Name}
                  disabled={!stage1Number || stage1Number > Math.floor(rows.length / 4) || rows.length < 4}
                >
                  Esegui
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <InputGroup onChange={e => setNewRowsNumber(e.target.value)}>
              <InputGroup.Prepend>
                <InputGroup.Text>Aggiunti N nuove coppie</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                disabled={availableRows <= 0}
                placeholder={
                  availableRows <= 0
                    ? 'Numero massimo di coppie gia creato'
                    : `Numero di coppie da aggiungere ( max ${availableRows} )`
                }
                aria-label="Numero di coppie"
                value={newRowsNumber || ''}
              />
              <InputGroup.Append>
                <Button
                  variant="primary"
                  onClick={e => setNewRowsNumber(availableRows)}
                  disabled={newRowsNumber > availableRows}
                >
                  Max
                </Button>
                <Button
                  variant="primary"
                  onClick={addMultipleRows}
                  disabled={!newRowsNumber || newRowsNumber > availableRows}
                >
                  Esegui
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Row>
          <Row>
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={rows}
              columns={columns(onSelect, options)}
              cellEdit={cellEditProps}
              selectRow={selectRow}
              noDataIndication={<NoData addRow={addRow} optionsLength={options.length} />}
              caption={<TableHeader tournament={tournament} />}
              wrapperClasses="player-table"
              headerClasses="player-table-header"
              striped
              hover
            />
          </Row>
        </Col>
        <Col style={{ margin: '10px' }} md={2}>
          <SuccessToast message={successMessage} />
          <WarningToast message={allertMessage} />
          <ErrorToast message={errorMessage} />
        </Col>
      </Row>
    </>
  );
};

export default PairsTable;
