import React, { useState, useEffect } from 'react';
import { Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import BootstrapTable, { SelectRowProps, ColumnDescription } from 'react-bootstrap-table-next';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
// Components
import NoData from './noData';
// Core / Helper / Editor
import { LoadingModal, YesNoModal, YesNoModalProps } from '../core/generic/Commons';
import { FormEventType } from '../core/types';
import { RightArrowIcon, TrashIcon, PlusIcon, HomeIcon } from '../core/icons';
import { cellEditProps, columns } from './editor';
// Style
import './style.css';
import commonStyle from '../../common.module.css';
// Service
import { fetchPlayers, getEmptyPlayer } from '../../redux/services/player.service';
// Selector
import { AuthSelector } from 'src/redux/selectors/auth.selector';
import { TournamentSelector } from 'src/redux/selectors/tournament.selector';
// Action
import { TournamentAction, PairAction } from '../../redux/actions';
import TournamentBadge from '../Tournament/badge';
import { useTranslation } from 'react-i18next';
// Models
import { PairDTO, PlayerDTO, TournamentProgress } from 'src/@common/dto';
import {
  deletePairs,
  fetchPairs,
  findAlias,
  getEmptyPair,
  postPair,
  updatePair,
} from 'src/redux/services/pair.service';
import { HTTPStatusCode } from 'src/@common/models/HttpStatusCode';
import { LABEL_COMMON_LOADING } from 'src/@common/constants/label';

const hideAskUser = {
  message: '',
  onClick: () => console.log(''),
  show: false,
  title: '',
};
interface PairTableProps {}
// eslint-disable-next-line sonarjs/cognitive-complexity
const PairsTable: React.FC<PairTableProps> = () => {
  // Navigation
  const currentHistory = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation(['common', 'pair']);

  const isAdmin = useSelector(AuthSelector.isAdmin);
  const tournament = useSelector(TournamentSelector.getTournament)!;

  // States
  // User messages
  const [isLoading, setIsLoading] = useState({ state: false, message: t(LABEL_COMMON_LOADING) });
  const [askUser, setAskUser] = useState<YesNoModalProps>(hideAskUser);

  // Data
  const [data, setData] = useState<{ rows: PairDTO[]; players: PlayerDTO[] }>({ rows: [], players: [] });
  const [selectedRows, setSelectedRows] = useState<PairDTO[]>([]);
  // Function params
  const [stage1Number, setStage1Number] = useState<number>(0);
  const [newRowsNumber, setNewRowsNumber] = useState<number>(0);

  // Initial Fetch
  useEffect(() => {
    if (!tournament) return;
    (async () => {
      const { pairsList } = await fetchPairs({ tId: tournament.id! });
      const { playersList } = await fetchPlayers({ addEmpty: true, tId: tournament.id! });
      setData({ rows: pairsList, players: playersList });
    })();
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
      setIsLoading({ state: true, message: t(LABEL_COMMON_LOADING) });
      const emptyRow:PairDTO = getEmptyPair();
      emptyRow.tournamentId = tournament.id || 0;
      const result = await postPair({ pair: emptyRow });
      emptyRow.id = result.pair.id;
      emptyRow.rowNumber = index || data.rows.length + 1;
      setData((current) => ({
        rows: [emptyRow, ...current.rows].map((p, i) => ({...p,rowNumber:i+1})),
        players: current.players,
      }));
      showSuccessMessage(t('pair:success.add'));
    } catch (error) {
      showErrorMessage(t('pair:error.19'));
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
      setIsLoading({ state: true, message: t(LABEL_COMMON_LOADING) });
      // Devo ripristinare i giocatori eliminati
      const players: Array<PlayerDTO> = [];
      selectedRows.forEach((e) => {
        if (e.player1 && e.player1.id) players.push(e.player1);
        if (e.player2 && e.player2.id) players.push(e.player2);
      });

      await deletePairs({ pairsList: selectedRows });
      setData((current) => ({
        rows: current.rows.filter((row) => !selectedRows.find((selectedRow) => selectedRow.id === row.id)),
        players: players
          ? [...players, ...current.players].sort((e1, e2) => e1.alias.localeCompare(e2.alias))
          : current.players,
      }));

      showSuccessMessage(t(`pair:success.${selectedRows.length > 1 ? 'deleteMulti' : 'deleteOne'}`));
    } catch (error) {
      showErrorMessage(t('pair:error.18'));
    }

    setSelectedRows([]);
  }

  // update players list when a player is selected
  function updateOptions(player: PlayerDTO | undefined, selected: PlayerDTO) {
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
  const onSelect = async (selectedElement: PlayerDTO, rowIndex: number, columnIndex: number) => {
    const newRowsElement = await Promise.all(
      data.rows.map<Promise<PairDTO>>(async (rowElement) => {
        if (rowElement.id === rowIndex) {
          let row = rowElement;
          if (columnIndex === 1) {
            if (selectedElement.id && row.player2 && row.player2.id === selectedElement.id) {
              // Devo salvare l'elemnto che sto per sostituire
              row.player1 = getEmptyPlayer();
              showErrorMessage(t('pair:error.17'));
            } else {
              // Aggiorno la lista dei giocatori disponibili prima di aggiornare i dati
              updateOptions(row.player1, selectedElement);
              row.player1 = selectedElement;
            }
          } else {
            if (selectedElement.id && row.player1 && row.player1.id === selectedElement.id) {
              row.player2 = getEmptyPlayer();
              showErrorMessage(t('pair:error.17'));
            } else {
              updateOptions(row.player2, selectedElement);
              row.player2 = selectedElement;
            }
          }
          //
          if (!row.alias && row.player1 && row.player1.id && row.player2 && row.player2.id) {
            const result = await findAlias({ player1Id: row.player1.id, player2Id: row.player2.id });
            row.alias = result.code === HTTPStatusCode.OK && result.alias ? result.alias : '';
          }
          // update Db. Non aspetto la risposta...
          updatePair({ pair: row });
          return row;
        } else return rowElement;
      })
    );
    setData((current) => ({
      rows: newRowsElement,
      players: current.players,
    }));
  };

  const handleSelect = (row: PairDTO, isSelected: boolean) => {
    setSelectedRows((rows) => {
      const found = rows.find((e) => e.id === row.id) ? true : false;
      if (isSelected) {
        return found ? rows : [row, ...rows];
      } else {
        return found ? rows.filter((e) => e.id !== row.id) : rows;
      }
    });
    return true;
  };

  const confirmPairs = async () => {
    if (!tournament.id) {
      showErrorMessage(`${t('pair:error.16')}...`);
      setTimeout(() => currentHistory.push('/'), 5000);
    }

    // Controllo che sia presente almeno una coppia
    if (data.rows.length < 4) {
      showErrorMessage(t('pair:error.15'));
      return;
    }
    // Controllo gironi non assegnati
    const missingStage1Name = data.rows
      .filter((e: { stage1Name: string }) => !e.stage1Name || e.stage1Name === '')
      .map((e) => e.rowNumber);
    if (missingStage1Name.length !== 0) {
      showErrorMessage(t(`pair:error.${missingStage1Name.length === 1 ? '13' : '14'}`, { missingStage1Name }));
      return;
    }

    // Controllo coppie non assegnate
    const missingPairs = data.rows
      .filter((e) => !e.player1 || !e.player1.id || !e.player2 || !e.player2.id)
      .map((e) => e.rowNumber);
    if (missingPairs.length !== 0) {
      showErrorMessage(t(`pair:error.${missingPairs.length === 1 ? '11' : '12'}`, { missingPairs }));
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
        t(`pair:error.${invalidStage.length === 1 ? '9' : '10'}`, { invalidStage, min: MIN_PAIR_PER_STAGE + 1 })
      );
      return;
    }

    // Se sono un utente che puo modificare e il torneo è in una fase minore ( vedi ordinamento Enum ) di quella attuale
    // allora aggiorno lo stato del torneo
    if (isAdmin && tournament.progress < TournamentProgress.Stage1) {
      tournament.progress = TournamentProgress.Stage1;
      dispatch(TournamentAction.update.request({ tournament }));
    }
    // Go to Stage1
    dispatch(PairAction.fetch.request({ tId: tournament.id! }));
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
    hideSelectColumn: !isAdmin || tournament.progress > TournamentProgress.PairsSelection,
  };

  const processDeleteStage1 = async () => {
    try {
      setIsLoading({ state: true, message: t(LABEL_COMMON_LOADING) });
      const response = await fetch('/api/v1/stage1', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tId: tournament.id }),
      });
      await response.json();
      // Update tournament progress
      if (isAdmin) {
        dispatch(
          TournamentAction.update.request({
            tournament: { ...tournament, progress: TournamentProgress.PairsSelection },
          })
        );
      }
      showSuccessMessage(t('pair:success.delete'));
      setAskUser(hideAskUser);
    } catch (error) {
      showErrorMessage(t('pair:error.8'));
    }
  };

  function deleteStage1() {
    if (tournament.progress > TournamentProgress.Stage1) {
      showErrorMessage(t('pair:error.7'));
      return;
    }
    // Chiedo conferma all'utente
    setAskUser({
      message: `${t('pair:stage1.resetConfirm')} ?`,
      onClick: () => processDeleteStage1(),
      onHide: () => setAskUser(hideAskUser),
      show: true,
      title: t('pair:stage1.reset'),
    });
  }

  async function setStage1Name() {
    if (!stage1Number) {
      showErrorMessage(t('pair:error.6'));
      return;
    }

    if (tournament.progress > TournamentProgress.PairsSelection) {
      showErrorMessage(t('pair:error.5'));
      return;
    }

    setIsLoading({ state: true, message: t(LABEL_COMMON_LOADING) });
    const names = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
    let current = 0;
    let newRows: PairDTO[] = data.rows.map(row => {
      if (current === stage1Number) current = 0;
      row.stage1Name = names[current];
      current++;
      postPair({ pair: row });
      return row;
    });
    //const mapper = data.rows.map(p => ({ id: p.id, stage1Name: p.stage1Name }));
    showSuccessMessage(t('pair:success.stage1Name'));
    setData((prevData) => ({ rows: newRows, players: prevData.players }));
  }

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

  const deleteDisabled = selectedRows.length <= 0 || tournament.progress > TournamentProgress.PairsSelection;

  //console.log('render table : ', players, pairs);

  const assignMatches = (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>{t('pair:stage1.set')}</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder={
          data.rows.length < 4 ? t('pair:error.3') : t('pair:error.4', { max: Math.floor(data.rows.length / 4) })
        }
        type="number"
        step={1}
        min={0}
        max={Math.floor(data.rows.length / 4)}
        value={stage1Number !== 0 ? stage1Number : undefined}
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
          {t('common:exec')}
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
  const addPairs =  (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>{t('pair:add.multi')}</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        disabled={availableRows <= 0}
        type="number"
        step={1}
        min={1}
        max={availableRows}
        placeholder={availableRows <= 0 ? t('pair:error.1') : t('pair:error.2', { max: availableRows })}
        onChange={(event: React.FormEvent<FormEventType>) => setNewRowsNumber(Number(event.currentTarget.value))}
        value={newRowsNumber || ''}
      />
      <InputGroup.Append>
        <Button
          variant="primary"
          onClick={(e: any) => setNewRowsNumber(availableRows)}
          disabled={newRowsNumber > availableRows}
        >
          {t('common:max')}
        </Button>
        <Button variant="primary" onClick={addMultipleRows} disabled={!newRowsNumber || newRowsNumber > availableRows}>
          {t('common:exec')}
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );

  const toolsBar =  (
    <div className={commonStyle.toolsBarContainer} data-cy="pair-toolbar">
      <Row className={commonStyle.toolsBar}>
        <Col>
          <Button variant="secondary" className="float-left align-middle" onClick={goBack}>
            <HomeIcon /> {t('common:route.home')}
          </Button>
        </Col>

        {tournament.progress > TournamentProgress.PairsSelection ? null : (
          <Col>
            <Button
              variant="success"
              className="align-middle"
              onClick={() => addRow()}
              disabled={availableRows <= 0 || !isAdmin}
            >
              <PlusIcon /> {t('pair:add.one')}
            </Button>
          </Col>
        )}
        {tournament.progress > TournamentProgress.PairsSelection ? null : (
          <Col>
            <Button variant="danger" className="align-middle" onClick={deleteRow} disabled={deleteDisabled || !isAdmin}>
              <TrashIcon /> {selectedRows.length === 1 ? t('pair:delete.one') : t('pair:delete.multi')}
            </Button>
          </Col>
        )}
        {tournament.progress !== TournamentProgress.Stage1 ? null : (
          <Col>
            <Button variant="danger" className="align-middle" onClick={deleteStage1} disabled={!isAdmin}>
              {t('stage1:reset')}
            </Button>
          </Col>
        )}
        <Col>
          <Button
            variant="outline-warning"
            className="default-color-white float-right align-middle"
            onClick={confirmPairs}
            disabled={!isAdmin}
          >
            <b>{t('common:continue')} </b> <RightArrowIcon />
          </Button>
        </Col>
      </Row>
      {isAdmin && tournament.progress <= TournamentProgress.PairsSelection ? (
        <>
          {assignMatches}
          {addPairs}
        </>
      ) : null}
    </div>
  );

  const labels = {
    player1: t('pair:field.player1'),
    player2: t('pair:field.player2'),
    alias: t('pair:field.alias'),
    stage1: t('pair:field.stage1'),
    paid1: t('pair:field.paid1'),
    paid2: t('pair:field.paid2'),
  };

  return (
    <div>
      <YesNoModal message={askUser.message} title={askUser.title} onClick={askUser.onClick} show={askUser.show} />
      <LoadingModal show={isLoading.state} message={isLoading.message} />
      <Col>
        {toolsBar}
        <Row>
          <Col data-cy="pair-table">
            { // https://github.com/react-bootstrap-table/react-bootstrap-table2/issues/1451
            	data.rows && data.players ? (
              <BootstrapTable
								data-cy="pair-table"
                bootstrap4
                keyField="id"
                data={data.rows}
                columns={columns(onSelect, data.players, labels) as ColumnDescription<PairDTO, PairDTO>[]}
                cellEdit={cellEditProps(isAdmin && tournament.progress < TournamentProgress.Stage1)}
                selectRow={selectRow}
                noDataIndication={() => (
                  <NoData isEditable={isAdmin || false} addRow={() => addRow()} optionsLength={data.players.length} />
                )}
                caption={<TournamentBadge />}
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
