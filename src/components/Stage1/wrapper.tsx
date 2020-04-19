import React, { useState, useEffect, useRef, createRef } from 'react';
import { useParams, useHistory } from 'react-router';
import { fetchPairs } from '../Pair/helper';
import { Pair } from './type';
import Stage1Handler from './handler';
import { ListGroup, Button } from 'react-bootstrap';

/**
 * Wraps multiple table components
 */
//https://medium.com/@renatognunes/react-hooks-passing-child-component-state-up-with-useref-de88401c2654
const Wrapper: React.FC = (): JSX.Element => {
  const { tId } = useParams();
  const [pairsList, setPairsList] = useState<Pair[]>([]);
  const elementsRef = useRef(pairsList.map(() => createRef()));

  let currentHistory = useHistory();

  function goBack() {
    currentHistory.push(`/tournament/${tId}`);
  }

  function goToStage2(rows: any) {
    console.log('goToStage2 : ', elementsRef);
  }

  useEffect(() => fetchPairs(setPairsList, tId), [tId]);

  const tables = renderTables(pairsList, tId, elementsRef);
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

export default Wrapper;

function renderTables(
  pairsList: Pair[],
  tId: string | undefined,
  refs: React.MutableRefObject<React.RefObject<unknown>[]>
): JSX.Element {
  let stageName = '';
  let stage: Pair[] = [];
  let stageList: JSX.Element[] = [];
  // sort pairs by stage1Name
  pairsList
    .sort((obj1, obj2) => obj1.stage1Name.localeCompare(obj2.stage1Name))
    // FIXME: use .reduce
    .forEach((element, index) => {
      // A rottura di stage1Name
      if (stageName === '') stageName = element.stage1Name;
      if (stageName !== element.stage1Name) {
        stageList.push(
          <ListGroup.Item className={'inherit-background'} key={`stage-${stageName}`}>
            <Stage1Handler ref={refs.current[index]} pairsList={stage} />
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
        <Stage1Handler ref={refs.current[stageList.length]} pairsList={stage} />
      </ListGroup.Item>
    );
    // console.log(`stages ${stageName} :`, stage);
  }

  return <ListGroup variant="flush">{stageList}</ListGroup>;
}
