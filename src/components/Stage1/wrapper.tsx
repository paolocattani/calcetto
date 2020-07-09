import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Stage1Handler from './handler';
import { ListGroup, Button, Row, Col } from 'react-bootstrap';
import { fetchPairs } from 'components/Pair/helper';
import { PairDTO, TournamentProgress } from 'models';
import { useSelector, useDispatch } from 'react-redux';
import { TournamentSelector } from 'selectors/tournament.selector';
import { withRouter } from 'react-router-dom';
import { Stage1Selector } from 'selectors/stage1.selector';
import commonStyle from '../../common.module.css';

import { Stage2Action, TournamentAction } from 'actions';
import { SessionSelector } from 'selectors/session.selector';
import { RightArrowIcon, TrashIcon } from 'components/core/icons';

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

  const [pairsList, setPairsList] = useState<PairDTO[]>([]);
  const [autoOrder /*, setAutoOrder*/] = useState<boolean>(true);
  const hideError: ModalProps = { show: false, message: '' };
  const [showError, setShowError] = useState<ModalProps>(hideError);

  function goBack() {
    currentHistory.push('/tournament');
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
    if (pairsList.length > 4) {
      count = pairsList.length - 1;
      while (count % 8 !== 0) count++;
    }
    dispatch(Stage2Action.fetchStage2.request({ tournamentId: tournament.id!, count }));
    currentHistory.push('/stage2');
  }

  useEffect(() => {
    if (!pairsList || pairsList.length === 0 || needRefresh) fetchPairs(setPairsList, tournament.id!);
  }, [tournament.id, needRefresh, pairsList]);

  return (
    <>
      <Col className={commonStyle.toolsBarContainer}>
        <div className={commonStyle.toolsBar}>
          <Button variant="secondary" onClick={goBack} className="float-left">
            Gestione Coppie
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
      {renderTables(pairsList, autoOrder)}
    </>
  );
};

export default withRouter(Wrapper);

function renderTables(pairsList: PairDTO[], autoOrder: boolean): JSX.Element {
  let stageName = '';
  let stage: PairDTO[] = [];
  let stageList: JSX.Element[] = [];
  // sort pairs by stage1Name
  console.log('PairsList : ', pairsList);

  pairsList
    .sort((obj1, obj2) => obj1.stage1Name.localeCompare(obj2.stage1Name))
    // FIXME: use .reduce  ?
    .forEach((element, index) => {
      // A rottura di stage1Name
      if (stageName === '') stageName = element.stage1Name;
      if (stageName !== element.stage1Name) {
        stageList.push(<Stage1Handler pairsList={stage} autoOrder={autoOrder} />);
        stageName = element.stage1Name;
        stage = [];
      }
      stage.push(element);
    });
  if (stage.length > 0) {
    stageList.push(<Stage1Handler pairsList={stage} autoOrder={autoOrder} />);
    // console.log(`stages ${stageName} :`, stage);
  }

  return <ListGroup variant="flush">{stageList}</ListGroup>;
}
