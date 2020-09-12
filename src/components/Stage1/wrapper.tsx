// React, Router, Redux
import { useHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Style
import commonStyle from '../../common.module.css';
import { RightArrowIcon, TrashIcon, LeftArrowIcon } from '../core/icons';
import { Button, Col, Row, ButtonGroup, ToggleButton } from 'react-bootstrap';
// Actions, Selectors
import { Stage2Action, TournamentAction } from '../../redux/actions';
import { SessionSelector, TournamentSelector, Stage1Selector, PairSelector } from 'redux/selectors';
import Stage1Table from './table';
import TournamentBadge from '../Tournament/badge';
// Models
import { PairDTO, TournamentProgress } from '@common/dto';

/**
 * Wraps multiple table components
 */
const Wrapper: React.FC = (): JSX.Element => {
  const currentHistory = useHistory();
  const dispatch = useDispatch();

  // Session
  const session = useSelector(SessionSelector.getSession);
  // Torneo
  const tournament = useSelector(TournamentSelector.getTournament, (prev, curr) => prev?.progress !== curr?.progress)!;
  // Sono presenti aggiornamenti
  const needRefresh = useSelector(Stage1Selector.getNeedRefresh);
  // Squadre selezionate
  const selected = useSelector(Stage1Selector.getSelectedPairs);
  // Lista coppie
  const pairsList = useSelector(PairSelector.getPairsList);

  function goBack() {
    currentHistory.push(session.isAdmin ? '/tournament' : '/');
  }
  function goToStage2() {
    // TODO: eseguire controlli e eventualemente mostrare messaggi utente

    // Se sono un utente che puo modificare e il torneo è in una fase minore ( vedi ordinamento Enum ) di quella attuale
    // allora aggiorno lo stato del torneo
    if (session.isAdmin && tournament.progress < TournamentProgress.Stage2) {
      tournament.progress = TournamentProgress.Stage2;
      dispatch(TournamentAction.update.request({ model: tournament }));
    }

    let count = 8;
    if (selected && selected.length >= 4) {
      count = selected.length - 1;
      while (count % 8 !== 0) count++;
    }
    dispatch(Stage2Action.fetchStage2.request({ tournamentId: tournament.id!, count }));
    currentHistory.push('/stage2');
  }

  console.log('Refreshing : ', needRefresh);
  const toolsBar = (
    <div className={commonStyle.toolsBarContainer}>
      <Row className={commonStyle.toolsBarRow}>
        <Col>
          <Button variant="secondary" onClick={goBack} className="float-left">
            <LeftArrowIcon /> Indietro
          </Button>
        </Col>
        {tournament.progress > TournamentProgress.Stage1 ? (
          <Col>
            <Button
              variant="danger"
              onClick={() => dispatch(Stage2Action.delete.request({ tId: tournament.id! }))}
              disabled={!session.isAdmin || (session.isAdmin && tournament.progress < TournamentProgress.Stage2)}
            >
              <TrashIcon /> Reset Fase 2
            </Button>
          </Col>
        ) : null}
        <Col>
          <Button
            variant="outline-warning"
            className="default-color-white float-right"
            onClick={goToStage2}
            disabled={selected.length < 4 && tournament.progress < TournamentProgress.Stage2}
          >
            <b>Prosegui </b> <RightArrowIcon />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ButtonGroup toggle className="mb-2">
            <ToggleButton
              type="checkbox"
              variant={!!tournament.autoOrder ? 'success' : 'danger'}
              checked={tournament.autoOrder}
              value="1"
              onChange={(e) =>
                dispatch(
                  TournamentAction.update.request({
                    model: { ...tournament, autoOrder: e.currentTarget.checked },
                  })
                )
              }
            >
              {`Ordinamento automatico : ${!!tournament.autoOrder ? 'Attivato ' : ' Disattivato'}`}
            </ToggleButton>
          </ButtonGroup>
        </Col>
      </Row>
    </div>
  );
  return (
    <>
      {toolsBar}
      <TournamentBadge />
      {pairsList ? renderTables(pairsList, tournament.autoOrder) : null}
    </>
  );
};

export default withRouter(Wrapper);

function renderTables(pairsList: PairDTO[], autoOrder: boolean): JSX.Element[] {
  let stageName = '';
  let stage: PairDTO[] = [];
  let stageList: Array<JSX.Element> = [];
  // sort pairs by stage1Name
  [...pairsList]
    .sort((obj1, obj2) => obj1.stage1Name.localeCompare(obj2.stage1Name))
    // FIXME: use .reduce  ?
    .forEach((element, index) => {
      // A rottura di stage1Name
      if (stageName === '') stageName = element.stage1Name;
      if (stageName !== element.stage1Name) {
        stageList.push(<Stage1Table key={`Stage1-${stageName}`} pairsList={stage} autoOrder={autoOrder} />);
        stageName = element.stage1Name;
        stage = [];
      }
      stage.push(element);
    });
  if (stage.length > 0) {
    stageList.push(<Stage1Table key={`Stage1-${stageName}`} pairsList={stage} autoOrder={autoOrder} />);
    // console.log(`stages ${stageName} :`, stage);
  }

  return stageList;
}
