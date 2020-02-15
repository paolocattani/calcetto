import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { fetchPairs } from '../Pair/helper';
import { Pair, wapperPropsType } from './type';
import Stage1Handler from './handler';
import { ListGroup, Button } from 'react-bootstrap';

/**
 * Wraps multiple table components
 */
const Wrapper: React.FC<wapperPropsType> = (props: wapperPropsType): JSX.Element => {
  const { tId } = useParams();
  const [pairsList, setPairsList] = useState<Pair[]>([]);

  let currentHistory = useHistory();
  function goBack() {
    currentHistory.push(`/tournament/${tId}`);
  }

  useEffect(() => fetchPairs(setPairsList, tId), [tId]);
  // sort pairs by stage1Name
  pairsList.sort((obj1, obj2) => obj1.stage1Name.localeCompare(obj2.stage1Name));
  return (
    <>
      <ListGroup.Item key={'stage-button'}>
        <Button variant="secondary" onClick={goBack}>
          Gestione Coppie
        </Button>
      </ListGroup.Item>
      {renderTables(pairsList, tId)}
    </>
  );
};

export default Wrapper;

function renderTables(pairsList: Pair[], tId: string | undefined): JSX.Element {
  let stageName = '';
  let stage: Pair[] = [];
  let stageList: JSX.Element[] = [];

  pairsList.forEach((element, index) => {
    // A rottura di stage1Name
    if (stageName === '') stageName = element.stage1Name;
    if (stageName !== element.stage1Name) {
      stageList.push(
        <ListGroup.Item key={`stage-${stageName}`}>
          <Stage1Handler pairsList={stage} />
        </ListGroup.Item>
      );
      // console.log(`stages ${stageName} :`, stage, stage.length);
      stageName = element.stage1Name;
      stage = [];
    }
    stage.push(element);
  });
  if (stage.length > 0) {
    stageList.push(
      <ListGroup.Item key={`stage-${stageName}`}>
        <Stage1Handler pairsList={stage} />
      </ListGroup.Item>
    );
    // console.log(`stages ${stageName} :`, stage);
  }

  return <ListGroup variant="flush">{stageList}</ListGroup>;
}
