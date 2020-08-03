// React, Router, Redux
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Models
import { PairDTO, TournamentProgress } from 'models';
// Style
import commonStyle from '../../common.module.css';
import { RightArrowIcon, TrashIcon, LeftArrowIcon } from '../core/icons';
import { ListGroup, Button, Col } from 'react-bootstrap';
// Actions, Selectors
import { Stage2Action, TournamentAction } from 'actions';
import { SessionSelector, TournamentSelector, Stage1Selector, PairSelector } from 'selectors';
//
import Stage1Handler from './handler';

interface ModalProps {
  show: boolean;
  message: string;
}
/**
 * Wraps multiple table components
 */
const Wrapper: React.FC = (): JSX.Element => {
  const currentHistory = useHistory();
  const dispatch = useDispatch();

  // Session
  const session = useSelector(SessionSelector.getSession);
  // Torneo
  const tournament = useSelector(TournamentSelector.getTournament)!;
  // Sono presenti aggiornamenti
  const needRefresh = useSelector(Stage1Selector.getNeedRefresh);
  // Squadre selezionate
  const selected = useSelector(Stage1Selector.getSelectedPairs);
  // Lista coppie
  const pairsList = useSelector(PairSelector.getPairsList);

  // TODO:
  const [autoOrder /*, setAutoOrder*/] = useState<boolean>(true);

  function goBack() {
    currentHistory.push(session.isAdmin ? '/tournament' : '/');
  }
  function goToStage2() {
    // TODO: eseguire controlli e eventualemente mostrare messaggi utente

    // Se sono un utente che puo modificare e il torneo è in una fase minore ( vedi ordinamento Enum ) di quella attuale
    // allora aggiorno lo stato del torneo
    if (session.isAdmin && tournament.progress < TournamentProgress.Stage2) {
      tournament.progress = TournamentProgress.Stage2;
      dispatch(TournamentAction.updateTournament.request({ model: tournament }));
    }

    let count = 0;
    if (pairsList && pairsList.length > 4) {
      count = pairsList.length - 1;
      while (count % 8 !== 0) count++;
    }
    dispatch(Stage2Action.fetchStage2.request({ tournamentId: tournament.id!, count }));
    currentHistory.push('/stage2');
  }

  useEffect(() => {
    console.log('Refreshing...');
  }, [currentHistory, needRefresh, pairsList]);

  return (
    <>
      <Col className={commonStyle.toolsBarContainer}>
        <div className={commonStyle.toolsBar}>
          <Button variant="secondary" onClick={goBack} className="float-left">
            <LeftArrowIcon /> Indietro
          </Button>
          <Button variant="secondary" onClick={goBack} className="float-left">
            <LeftArrowIcon /> Indietro
          </Button>
          <Button
            variant="danger"
            className="align-middle"
            onClick={() => dispatch(Stage2Action.delete.request({ tId: tournament.id! }))}
            disabled={!session.isAdmin}
          >
            <TrashIcon /> Reset Fase 2
          </Button>
          {/* FIXME:
          <Form.Check
            custom
            checked={autoOrder}
            type="checkbox"
            id="autoOrder"
            label={`Ordinamento Automatico ${autoOrder}`}
            onChange={() => setAutoOrder(!autoOrder)}
          />
        */}
          <Button
            variant="outline-warning"
            className="default-color-white float-right align-middle"
            onClick={goToStage2}
            disabled={selected.length < 4 && tournament.progress < TournamentProgress.Stage2}
          >
            <b>Prosegui </b> <RightArrowIcon />
          </Button>
        </div>
      </Col>
      {pairsList ? renderTables(pairsList, autoOrder) : null}
    </>
  );
};

export default withRouter(Wrapper);

function renderTables(pairsList: PairDTO[], autoOrder: boolean): JSX.Element[] {
  let stageName = '';
  let stage: PairDTO[] = [];
  let stageList: Array<JSX.Element> = [];
  // sort pairs by stage1Name
  pairsList
    .sort((obj1, obj2) => obj1.stage1Name.localeCompare(obj2.stage1Name))
    // FIXME: use .reduce  ?
    .forEach((element, index) => {
      // A rottura di stage1Name
      if (stageName === '') stageName = element.stage1Name;
      if (stageName !== element.stage1Name) {
        stageList.push(<Stage1Handler key={`Stage1-${stageName}`} pairsList={stage} autoOrder={autoOrder} />);
        stageName = element.stage1Name;
        stage = [];
      }
      stage.push(element);
    });
  if (stage.length > 0) {
    stageList.push(<Stage1Handler key={`Stage1-${stageName}`} pairsList={stage} autoOrder={autoOrder} />);
    // console.log(`stages ${stageName} :`, stage);
  }

  return stageList;
}
