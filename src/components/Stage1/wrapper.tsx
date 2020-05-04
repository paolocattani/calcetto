import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Stage1Handler from './handler';
import { ListGroup, Button } from 'react-bootstrap';
import { fetchPairs } from 'components/Pair/helper';
import { PairDTO } from 'models';
import { useSelector } from 'react-redux';
import { TournamentSelector } from 'selectors/tournament.selector';
import { withRouter } from 'react-router-dom';
import { Stage1Selector } from 'selectors/stage1.selector';

/**
 * Wraps multiple table components
 */
//https://medium.com/@renatognunes/react-hooks-passing-child-component-state-up-with-useref-de88401c2654
const Wrapper: React.FC = (): JSX.Element => {
  const tournament = useSelector(TournamentSelector.getTournament)!;
  const selected = useSelector(Stage1Selector.getSelectedPairs);
  const [pairsList, setPairsList] = useState<PairDTO[]>([]);

  let currentHistory = useHistory();

  function goBack() {
    currentHistory.push('/tournament');
  }
  function goToStage2() {
    // TODO: eseguire controlli
    console.log('goToStage2 : ', selected);
    currentHistory.push('/stage2');
  }

  useEffect(() => fetchPairs(setPairsList, tournament.id!), [tournament.id]);

  const tables = renderTables(pairsList);
  return (
    <>
      <ListGroup.Item className={'inherit-background'} key={'stage-button'}>
        <Button variant="secondary" onClick={goBack}>
          Gestione Coppie
        </Button>

        <Button variant="success" onClick={goToStage2}>
          Prosegui
        </Button>
      </ListGroup.Item>
      {tables}
    </>
  );
};

export default withRouter(Wrapper);

function renderTables(pairsList: PairDTO[]): JSX.Element {
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
        stageList.push(
          <ListGroup.Item className={'inherit-background'} key={`stage-${stageName}`}>
            <Stage1Handler pairsList={stage} />
          </ListGroup.Item>
        );
        stageName = element.stage1Name;
        stage = [];
      }
      stage.push(element);
    });
  if (stage.length > 0) {
    stageList.push(
      <ListGroup.Item className={'inherit-background'} key={`stage-${stageName}`}>
        <Stage1Handler pairsList={stage} />
      </ListGroup.Item>
    );
    // console.log(`stages ${stageName} :`, stage);
  }

  return <ListGroup variant="flush">{stageList}</ListGroup>;
}
