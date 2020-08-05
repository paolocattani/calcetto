import React, { useState, useEffect } from 'react';
import { Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import BootstrapTable, { SelectRowProps, ColumnDescription } from 'react-bootstrap-table-next';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
// Components
import TableHeader from './header';
import NoData from './noData';
// Core / Helper / Editor
import { LoadingModal, YesNoModal, YesNoModalProps } from '../core/generic/Commons';
import { FormEventType } from '../core/generic/CommonTypes';
import { RightArrowIcon, TrashIcon, PlusIcon } from '../core/icons';
import { cellEditProps, columns } from './editor';
import { fetchData, getEmptyRowModel } from './helper';
// Style
import './style.css';
import commonStyle from '../../common.module.css';
// Service
import { getEmptyPlayer } from 'services/player.service';
// Selector
import { SessionSelector } from 'selectors/session.selector';
import { TournamentSelector } from 'selectors/tournament.selector';
// Models
import { PairDTO, PlayerDTO } from 'models';
import { TournamentProgress } from 'models/tournament.model';
// Action
import { TournamentAction, PairAction } from 'actions';

const hideAskUser = {
  message: '',
  onClick: () => console.log(''),
  show: false,
  title: '',
};
interface PairTableProps {}
const PairsTable: React.FC<PairTableProps> = () => {
  // Navigation
  const currentHistory = useHistory();
  const dispatch = useDispatch();
  const session = useSelector(SessionSelector.getSession);
  const tournament = useSelector(TournamentSelector.getTournament)!;

  // States
  // User messages
  const [isLoading, setIsLoading] = useState({ state: false, message: 'Caricamento' });
  const [askUser, setAskUser] = useState<YesNoModalProps>(hideAskUser);

  // Data
  const [data, setData] = useState({ rows: [] as PairDTO[], players: [] as PlayerDTO[] });
  const [selectedRows, setSelectedRows] = useState<PairDTO[]>([]);
  // Function params
  const [stage1Number, setStage1Number] = useState<number>(0);
  const [newRowsNumber, setNewRowsNumber] = useState<number>(0);

  // Initial Fetch
  useEffect(() => {
    if (!tournament) return;
    (async () => setData(await fetchData(tournament.id!)))();
  }, [tournament]);

  // User messages
  function showErrorMessage(message: string) {
    setIsLoading({ state: false, message });
    toast.error(message, { autoClose: 10000 });
  }
  function showSuccessMessage(message: string) {
    setIsLoading({ state: false, message });
    toast.success(message);
  }

  async function addRow(index?: number) {
    try {
      setIsLoading({ state: true, message: 'Aggiunta riga in corso' });
      const emptyRow = getEmptyRowModel();
      emptyRow.tId = tournament.id || 0;
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
      let players: PlayerDTO[] = [];
      selectedRows.forEach((e) => {
        if (e.player1 && e.player1.id) players.push(e.player1);
        if (e.player2 && e.player2.id) players.push(e.player2);
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
        rows: current.rows.filter((row) => !selectedRows.find((selectedRow) => selectedRow.id === row.id)),
        players: current.players,
      }));

      showSuccessMessage(selectedRows.length > 1 ? 'Righe cancellate' : 'Riga cancellata');
    } catch (error) {
      showErrorMessage('Errore cancellazione riga');
    }

    setSelectedRows([]);
  }

  // update players list when a player is selected
  function updateOptions(player: PlayerDTO, selected: PlayerDTO) {
    if (player && player.id)
      if (selected.id)
        setData((current) => ({
          rows: current.rows,
          players: [...current.players.filter((e) => e.id !== selected.id), player].sort((e1, e2) =>
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
  const onSelect = (selectedElement: PlayerDTO, rowIndex: number, columnIndex: number) => {
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

  const handleSelect = (row: PairDTO, isSelected: boolean) => {
    setSelectedRows((selectedRows) => {
      const found = selectedRows.find((e) => e.id === row.id) ? true : false;
      if (isSelected) {
        return found ? selectedRows : [row, ...selectedRows];
      } else {
        return found ? selectedRows.filter((e) => e.id !== row.id) : selectedRows;
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
      .map((e) => e.rowNumber);
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
      .filter((e) => !e.player1 || !e.player1.id || !e.player2 || !e.player2.id)
      .map((e) => e.rowNumber);
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

    // Se sono un utente che puo modificare e il torneo è in una fase minore ( vedi ordinamento Enum ) di quella attuale
    // allora aggiorno lo stato del torneo
    if (session.isAdmin && tournament.progress < TournamentProgress.Stage1) {
      tournament.progress = TournamentProgress.Stage1;
      dispatch(TournamentAction.updateTournament.request({ model: tournament }));
    }
    // Go to Stage1
    dispatch(PairAction.getPairs.request({ tId: tournament.id! }));
    currentHistory.push('/stage1');
  };

  function goBack() {
    currentHistory.push('/');
  }

  const selectRow: SelectRowProps<PairDTO> = {
    mode: 'checkbox',
    onSelect: handleSelect,
    onSelectAll: (isSelected: boolean, rows: PairDTO[]) => setSelectedRows(isSelected ? rows : []),
    style: { backgroundColor: '#c8e6c9' },
  };

  const processDeleteStage1 = async () => {
    try {
      setIsLoading({ state: true, message: 'Cancellazione in corso' });
      const response = await fetch('/api/v1/stage1', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tId: tournament.id }),
      });
      await response.json();
      // Update tournament progress
      if (session.isAdmin && tournament.progress < TournamentProgress.Stage1) {
        tournament.progress = TournamentProgress.PairsSelection;
        dispatch(TournamentAction.updateTournament.request({ model: tournament }));
      }
      showSuccessMessage('Cancellazione completata');
      setAskUser(hideAskUser);
    } catch (error) {
      showErrorMessage('Errore cancellazione Fase 1');
    }
  };

  function deleteStage1() {
    if (tournament.progress > TournamentProgress.Stage1) {
      showErrorMessage('Non è possibile cancellare in quanto il torneo è gia alla fase 2');
      return;
    }
    // Chiedo conferma all'utente
    setAskUser({
      message: 'Vuoi resettare i gironi ? ',
      onClick: () => processDeleteStage1(),
      onHide: () => setAskUser(hideAskUser),
      show: true,
      title: 'Reset Gironi',
    });
  }

  async function setStage1Name() {
    if (!stage1Number) {
      showErrorMessage('Specificare il numero di gironi da assegnare');
      return;
    }

    if (tournament.progress === TournamentProgress.Stage1 || tournament.progress === TournamentProgress.Stage2) {
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

  console.log('availableRows : ', data.rows);
  const availableRows = Math.floor(
    Math.floor((data.players.length - 1) / 2) -
      (data.rows.length === 0
        ? 0
        : data.rows.reduce((accumulator: number, e) => {
            if ((!e.player1 && !e.player2) || (!e.player1?.id && !e.player2?.id)) return accumulator + 1;
            if (!e.player1 || !e.player1.id || !e.player2 || !e.player2.id) return accumulator + 0.5;
            return accumulator;
          }, 0))
  );

  const deleteDisabled =
    !(selectedRows.length > 0) || tournament.progress === 'Stage1' || tournament.progress === 'Stage2';

  /*
  let deleteTooltipMessage = '';
  if (!(selectedRows.length > 0)) deleteTooltipMessage = 'Seleziona almeno una riga';
  else if (tournament.progress === 'Stage1' || tournament.progress === 'Stage2')
    deleteTooltipMessage = 'Devi prima resettare i gironi per poter cancellare delle coppie';
  else deleteTooltipMessage = 'Cancella le coppie selezionate';
*/
  //console.log('render table : ', players, pairs);

  const assignMatches = () => (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>Assegna gironi</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder={
          data.rows.length < 4
            ? 'Inserisci almeno 4 coppie'
            : `Numero di gironi ( max ${Math.floor(data.rows.length / 4)} )`
        }
        aria-label="Numero di gironi"
        type="number"
        step={1}
        min={0}
        max={Math.floor(data.rows.length / 4)}
        value={stage1Number}
        onChange={(event: React.FormEvent<FormEventType>) => setStage1Number(Number(event.currentTarget.value))}
        disabled={
          data.rows.length < 4 ||
          tournament.progress === TournamentProgress.Stage1 ||
          tournament.progress === TournamentProgress.Stage2
        }
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
  );
  const addPairs = () => (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>Aggiungi coppie</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        disabled={availableRows <= 0}
        type="number"
        step={1}
        min={1}
        max={availableRows}
        placeholder={
          availableRows <= 0
            ? 'Numero massimo di coppie gia creato'
            : `Numero di coppie da aggiungere ( max ${availableRows} )`
        }
        aria-label="Numero di coppie"
        onChange={(event: React.FormEvent<FormEventType>) => setNewRowsNumber(Number(event.currentTarget.value))}
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
        <Button variant="primary" onClick={addMultipleRows} disabled={!newRowsNumber || newRowsNumber > availableRows}>
          Esegui
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
  const toolsBar = () => (
    <Col className={commonStyle.toolsBarContainer}>
      <div className={commonStyle.toolsBar}>
        <Button variant="secondary" className="float-left align-middle" onClick={goBack}>
          Home
        </Button>
        <Button
          variant="success"
          className="align-middle"
          onClick={() => addRow()}
          disabled={availableRows <= 0 || !session.isAdmin}
        >
          <PlusIcon /> Aggiungi Coppia
        </Button>
        <Button
          variant="danger"
          className="align-middle"
          onClick={deleteRow}
          disabled={deleteDisabled || !session.isAdmin}
        >
          <TrashIcon /> Elimina Coppia
        </Button>
        <Button variant="danger" className="align-middle" onClick={deleteStage1} disabled={!session.isAdmin}>
          Reset gironi
        </Button>
        <Button
          variant="outline-warning"
          className="default-color-white float-right align-middle"
          onClick={confirmPairs}
          disabled={!session.isAdmin}
        >
          <b>Prosegui </b> <RightArrowIcon />
        </Button>
      </div>
      {session.isAdmin ? (
        <>
          {assignMatches()}
          {addPairs()}
        </>
      ) : null}
    </Col>
  );

  return (
    <div>
      <YesNoModal message={askUser.message} title={askUser.title} onClick={askUser.onClick} show={askUser.show} />
      <LoadingModal show={isLoading.state} message={isLoading.message} />
      <Col>
        <Row>{toolsBar()}</Row>
        <Row>
          <Col>
            {data.rows && data.players ? (
              <BootstrapTable
                bootstrap4
                keyField="id"
                data={data.rows}
                columns={columns(onSelect, data.players) as ColumnDescription<PairDTO>[]}
                cellEdit={cellEditProps(session.isAdmin)}
                selectRow={selectRow}
                noDataIndication={() => (
                  <NoData
                    isEditable={session.isAdmin || false}
                    addRow={() => addRow()}
                    optionsLength={data.players.length}
                  />
                )}
                caption={<TableHeader />}
                headerClasses="default-background default-color-yellow"
                striped
                hover
              />
            ) : null}
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default withRouter(PairsTable);
