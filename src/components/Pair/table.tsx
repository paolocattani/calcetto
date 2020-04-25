import React, { useState, useEffect } from 'react';
import { Button, ListGroup, InputGroup, FormControl, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { fetchData, getEmptyRowModel } from './helper';
import { useHistory } from 'react-router';
import TableHeader from './header';
import NoData from './noData';
import { LoadingModal, GenericToast, IToastProps } from '../core/generic/Commons';
import './style.css';
import { SessionContext } from '../core/routing/SessionContext';
import { RightArrowIcon } from '../core/icons';
import { TournamentProgress } from 'models/tournament.model';
import { useSelector } from 'react-redux';
import { TournamentSelector } from 'selectors/tournament.selector';
import { withRouter } from 'react-router-dom';
import { getEmptyPlayer } from 'services/player.service';
import { cellEditProps, columns } from './editor';

const PairsTable = () => {
  const tournament = useSelector(TournamentSelector.getTournament)!;
  // Navigation
  let currentHistory = useHistory();

  // States
  // User messages
  const [isLoading, setIsLoading] = useState({ state: false, message: 'Caricamento' });
  const messageInitialState: IToastProps = { message: '', type: 'success' };
  const [message, setMessage] = useState<IToastProps>(messageInitialState);
  // Data
  // FIXME:
  const [data, setData] = useState({ rows: [] as any, players: [] as any });
  // FIXME:
  const [selectedRows, setSelectedRows] = useState<any>([]);
  // Function params
  const [stage1Number, setStage1Number] = useState(0);
  const [newRowsNumber, setNewRowsNumber] = useState(0);

  // Initial Fetch
  useEffect(() => {
    (async () => setData(await fetchData(tournament.id!)))();
  }, [tournament.id]);

  // User messages
  function showErrorMessage(message: string) {
    setIsLoading({ state: false, message });
    setMessage({ message, type: 'danger' });
    setTimeout(() => setMessage(messageInitialState), 5000);
  }
  function showSuccessMessage(message: string) {
    setIsLoading({ state: false, message });
    setMessage({ message, type: 'success' });
    setTimeout(() => setMessage(messageInitialState), 5000);
  }

  async function addRow(index?: number) {
    try {
      setIsLoading({ state: true, message: 'Aggiunta riga in corso' });
      // FIXME:
      const emptyRow: any = getEmptyRowModel();
      emptyRow.tId = tournament.id;
      const response = await fetch('/api/v1/pair', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emptyRow),
      });
      const result = await response.json();
      emptyRow.id = result.id;
      emptyRow.rowNumber = index || data.rows.length + 1;
      setData((current) => ({
        rows: [emptyRow, ...current.rows],
        players: current.players,
      }));
      showSuccessMessage('Riga aggiunta');
    } catch (error) {
      showErrorMessage('Errore aggiunta riga');
    }
  }

  async function addMultipleRows() {
    let index = data.rows.length + 1;
    for (let ii = 0; ii < newRowsNumber; ii++) {
      await addRow(index);
      index++;
    }
    setNewRowsNumber(0);
  }

  async function deleteRow() {
    try {
      setIsLoading({
        state: true,
        message: selectedRows.length > 1 ? 'Cancellazione righe in corso' : 'Cancellazione riga in corso',
      });
      // Devo ripristinare i giocatori eliminati
      let players: any[] = [];
      // FIXME:
      selectedRows.forEach((e: any) => {
        if (e.player1.id) players.push(e.player1);
        if (e.player2.id) players.push(e.player2);
      });
      if (players)
        setData((current) => ({
          rows: current.rows,
          players: [...players, ...current.players].sort((e1, e2) => e1.alias.localeCompare(e2.alias)),
        }));

      const response = await fetch('/api/v1/pair', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedRows),
      });
      await response.json();

      setData((current) => ({
        // FIXME:
        rows: current.rows.filter(
          (row: { id: any }) => !selectedRows.find((selectedRow: any) => selectedRow.id === row.id)
        ),
        players: current.players,
      }));

      showSuccessMessage(selectedRows.length > 1 ? 'Righe cancellate' : 'Riga cancellata');
    } catch (error) {
      showErrorMessage('Errore cancellazione riga');
    }

    setSelectedRows([]);
  }

  // update players list when a player is selected
  function updateOptions(player: { id: any }, selected: { id: any }) {
    if (player && player.id)
      if (selected.id)
        setData((current) => ({
          rows: current.rows,
          players: [...current.players.filter((e: { id: any }) => e.id !== selected.id), player].sort((e1, e2) =>
            e1.alias.localeCompare(e2.alias)
          ),
        }));
      else
        setData((current) => ({
          rows: current.rows,
          players: [...current.players, player].sort((e1, e2) => e1.alias.localeCompare(e2.alias)),
        }));
    else if (selected.id)
      setData((current) => ({
        rows: current.rows,
        players: current.players.filter((e: { id: any }) => e.id !== selected.id),
      }));
  }
  // Aggiorno la colonna con il giocatore selezionato
  const onSelect = (selectedElement: { id: any }, rowIndex: any, columnIndex: number) => {
    const newRowsElement = data.rows.map((rowElement: { id: any }) => {
      if (rowElement.id === rowIndex) {
        let row: any = rowElement;
        if (columnIndex === 1) {
          if (selectedElement.id && row.player2 && row.player2.id === selectedElement.id) {
            // Devo salvare l'elemnto che sto per sostituire
            row.player1 = getEmptyPlayer();
            showErrorMessage('Attenzione : Non puoi selezionare lo stesso giocare ! ');
          } else {
            // Aggiorno la lista dei giocatori disponibili prima di aggiornare i dati
            updateOptions(row.player1, selectedElement);
            row.player1 = selectedElement;
          }
        } else {
          if (selectedElement.id && row.player1 && row.player1.id === selectedElement.id) {
            row.player2 = getEmptyPlayer();
            showErrorMessage('Attenzione : Non puoi selezionare lo stesso giocare ! ');
          } else {
            updateOptions(row.player2, selectedElement);
            row.player2 = selectedElement;
          }
        }
        // update Db. Non aspetto la risposta...
        fetch('/api/v1/pair', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(row),
        });
        return row;
      } else return rowElement;
    });
    setData((current) => ({
      rows: newRowsElement,
      players: current.players,
    }));
  };

  const handleSelect = (row: { id: any }, isSelected: any) => {
    // FIXME:
    setSelectedRows((selectedRows: any) => {
      const found = selectedRows.find((e: any) => e.id === row.id) ? true : false;
      if (isSelected) {
        return found ? selectedRows : [row, ...selectedRows];
      } else {
        return found ? selectedRows.filter((e: any) => e.id !== row.id) : selectedRows;
      }
    });
  };

  const confirmPairs = async () => {
    if (!tournament.id) {
      showErrorMessage('Id torneo mancante. Verrai inviato alla Home tra 5 secondi....');
      setTimeout(() => currentHistory.push('/'), 5000);
    }

    // Controllo che sia presente almeno una coppia
    if (data.rows.length < 4) {
      showErrorMessage('Numero di coppie insufficente. Devi formare almeno 4 coppie');
      return;
    }
    // Controllo gironi non assegnati
    const missingStage1Name = data.rows
      .filter((e: { stage1Name: string }) => !e.stage1Name || e.stage1Name === '')
      .map((e: { rowNumber: any }) => e.rowNumber);
    if (missingStage1Name.length !== 0) {
      showErrorMessage(
        `Assegna  ${
          missingStage1Name.length === 1 ? 'la riga ' : 'le righe '
        } ${missingStage1Name} ad un girone per procedere `
      );
      return;
    }

    // Controllo coppie non assegnate
    const missingPairs = data.rows
      .filter((e: { player1: { id: null }; player2: { id: null } }) => e.player1.id === null || e.player2.id === null)
      .map((e: { rowNumber: any }) => e.rowNumber);
    if (missingPairs.length !== 0) {
      showErrorMessage(
        `Assegna  i giocatori ${
          missingPairs.length === 1 ? 'alla riga ' : 'alle righe '
        } ${missingPairs} per procedere `
      );
      return;
    }

    // Controllo che non ci siano gironi con meno di 1 coppia ( meglio spostare 3 )
    const MIN_PAIR_PER_STAGE = 3;
    let invalidStage = [];
    const pairsInStage = data.rows.reduce((allNames: { [x: string]: number }, row: { stage1Name: string }) => {
      if (row.stage1Name in allNames) allNames[row.stage1Name]++;
      else allNames[row.stage1Name] = 1;
      return allNames;
    }, {});
    for (let stageName in pairsInStage) {
      if (pairsInStage[stageName] <= MIN_PAIR_PER_STAGE) invalidStage.push(stageName);
    }
    if (invalidStage.length > 0) {
      showErrorMessage(
        invalidStage.length === 1
          ? `Il torneo ${invalidStage} deve contenere almeno ${MIN_PAIR_PER_STAGE + 1} coppie`
          : `I torneI ${invalidStage} devono contenere almeno ${MIN_PAIR_PER_STAGE + 1} coppie`
      );
      return;
    }

    // Update tournament progress
    tournament.progress = TournamentProgress.Stage1;
    try {
      await fetch('/api/v1/tournament/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tournament),
      });
    } catch (error) {
      console.log('errororroror :', error);
    }
    // Go to Stage1
    currentHistory.push(`/stage1/${tournament.id}`);
  };
  /*
  function goBack() {
    currentHistory.push('/');
  }
*/
  const selectRow = {
    mode: 'checkbox',
    onSelect: handleSelect,
    onSelectAll: (isSelected: any, rows: any[]) => rows.forEach((row: any) => handleSelect(row, isSelected)),
    style: { backgroundColor: '#c8e6c9' },
  };

  async function deleteStage1() {
    try {
      setIsLoading({ state: true, message: 'Cancellazione in corso' });
      const response = await fetch('/api/v1/stage1', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tId: tournament.id }),
      });
      await response.json();
      // Update tournament progress
      //FIXME:
      tournament.progress = TournamentProgress.PairsSelection;
      fetch('/api/v1/tournament', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tournament),
      });
      showSuccessMessage('Cancellazione completata');
    } catch (error) {
      showErrorMessage('Errore cancellazione Fase 1');
    }
  }

  async function setStage1Name() {
    if (!stage1Number) {
      showErrorMessage('Specificare il numero di gironi da assegnare');
      return;
    }

    if (tournament.progress === 'Stage1' || tournament.progress === 'Stage2') {
      showErrorMessage('Non riassegnare i gironi in quanto le coppie sono gia state confermate per la fase successiva');
      return;
    }

    setIsLoading({ state: true, message: 'Aggiornamento in corso ' });
    let current = 0;
    const names = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    let newRows: any[] = [];
    for (let index in data.rows) {
      let row = data.rows[index];
      // FIXME: if (current === stage1Number) QUESTO NON FUNZIONA ===
      // eslint-disable-next-line eqeqeq
      if (current == stage1Number) current = 0;
      row['stage1Name'] = names[current];
      current++;
      try {
        fetch('/api/v1/pair', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(row),
        });
        newRows.push(row);
      } catch (error) {
        showErrorMessage('Errore');
        newRows.push(row);
      }
    }
    showSuccessMessage('Gironi assegnati correttamente');
    setData((current) => ({ rows: newRows, players: current.players }));
  }

  const availableRows = Math.floor(
    Math.floor((data.players.length - 1) / 2) -
      (data.rows.length === 0
        ? 0
        : data.rows.reduce((accumulator: number, e: { player1: { id: any }; player2: { id: any } }) => {
            if ((!e.player1 && !e.player2) || (!e.player1.id && !e.player2.id)) return accumulator + 1;
            if (!e.player1 || !e.player1.id || !e.player2 || !e.player2.id) return accumulator + 0.5;
            return accumulator;
          }, 0))
  );

  const deleteDisabled =
    !(selectedRows.length > 0) || tournament.progress === 'Stage1' || tournament.progress === 'Stage2';

  let deleteTooltipMessage = '';
  if (!(selectedRows.length > 0)) deleteTooltipMessage = 'Seleziona almeno una riga';
  else if (tournament.progress === 'Stage1' || tournament.progress === 'Stage2')
    deleteTooltipMessage = 'Devi prima resettare i gironi per poter cancellare delle coppie';
  else deleteTooltipMessage = 'Cancella le coppie selezionate';

  //console.log('render table : ', availableRows);

  const rightOuter = (
    <>
      <Button type="button" onClick={confirmPairs} size="lg" variant="outline-warning" className="default-color-white">
        <span style={{ fontSize: 'larger', fontWeight: 'bolder', padding: '1vw' }}>Prosegui</span>
        <RightArrowIcon size="lg" />
      </Button>

      <GenericToast message={message.message} type={message.type} />
    </>
  );

  const leftOuter = (isEditable: boolean | undefined) => (
    <>
      {isEditable ? (
        <Row style={{ margin: '0px' }}>
          <Col md="6" sm="12">
            <InputGroup
              onChange={(e: React.FormEvent<FormControl & HTMLInputElement>) =>
                setStage1Number(Number(e.currentTarget.value))
              }
            >
              <InputGroup.Prepend>
                <InputGroup.Text>Assegna gironi automaticamente</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder={
                  data.rows.length < 4
                    ? 'Inserisci almeno 4 coppie'
                    : `Numero di gironi ( max ${Math.floor(data.rows.length / 4)} )`
                }
                aria-label="Numero di gironi"
                disabled={data.rows.length < 4 || tournament.progress === 'Stage1' || tournament.progress === 'Stage2'}
              />
              <InputGroup.Append>
                <Button
                  variant="primary"
                  onClick={setStage1Name}
                  disabled={!stage1Number || stage1Number > Math.floor(data.rows.length / 4) || data.rows.length < 4}
                >
                  Esegui
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col md="6" sm="12">
            <InputGroup
              onChange={(e: React.FormEvent<FormControl & HTMLInputElement>) =>
                setNewRowsNumber(Number(e.currentTarget.value))
              }
            >
              <InputGroup.Prepend>
                <InputGroup.Text>Aggiungi coppie</InputGroup.Text>
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
                  onClick={(e: any) => setNewRowsNumber(availableRows)}
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
          </Col>
        </Row>
      ) : null}
      <Row style={{ margin: '5vh 0vh' }}>
        <Col md="2" sm="12">
          <ListGroup>
            {/*
            <ListGroup.Item action variant="secondary" onClick={goBack}>
              Home
            </ListGroup.Item>
            */}
            <ListGroup.Item
              action
              variant="success"
              onClick={() => addRow()}
              disabled={availableRows <= 0 || !isEditable}
            >
              Aggiungi Coppia
            </ListGroup.Item>

            <OverlayTrigger
              placement="right"
              key="right"
              overlay={<Tooltip id="tooltip-pair">{deleteTooltipMessage}</Tooltip>}
            >
              <span className="d-inline-block" onClick={deleteRow}>
                <ListGroup.Item
                  action
                  variant="danger"
                  style={{ pointerEvents: 'none' }}
                  disabled={deleteDisabled || !isEditable}
                >
                  Elimina Coppia {deleteDisabled}
                </ListGroup.Item>
              </span>
            </OverlayTrigger>

            <ListGroup.Item action variant="danger" onClick={deleteStage1} disabled={!isEditable}>
              Reset gironi
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md="10" sm="12">
          {/* FIXME: */}
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={data.rows as any}
            columns={columns(onSelect, data.players) as any}
            cellEdit={cellEditProps(isEditable) as any}
            selectRow={selectRow as any}
            noDataIndication={() => (
              <NoData isEditable={isEditable || false} addRow={() => addRow()} optionsLength={data.players.length} />
            )}
            caption={<TableHeader />}
            headerClasses="default-background default-color-yellow"
            striped
            hover
          />
        </Col>
      </Row>
    </>
  );

  return (
    <SessionContext.Consumer>
      {([session]) => (
        <>
          <Row>
            <LoadingModal show={isLoading.state} message={isLoading.message} />
            <Col md="10" sm="12">
              {leftOuter(session.isEditable)}
            </Col>
            <Col md="2" sm="12">
              {rightOuter}
            </Col>
          </Row>
        </>
      )}
    </SessionContext.Consumer>
  );
};

export default withRouter(PairsTable);
