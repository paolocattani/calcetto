import React, { Component } from 'react';
import './style.css';
import { getIndexes } from './helper';
import Node from './node';
// https://www.kodbiro.com/blog/rorgchart-react-module-for-displaying-and-editing-data-in-org-chart/

interface Stage2 extends Component {
  pairsNumber: number;
}

const Stage2: React.FC<Stage2> = ({ pairsNumber = 8 }) => {
  const rows: JSX.Element[] = [];
  const tdElements: number[] = getIndexes(pairsNumber);
  for (let ii = 1; ii < pairsNumber; ii++) {
    const row: JSX.Element[] = [];
    for (let jj = 0; jj < tdElements[ii]; jj++) row.push(<Node span={Math.pow(2, jj)} name={`${ii}-${jj}`} />);
    rows.push(<tr>{row}</tr>);
  }
  return (
    <table className="stage2-table">
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Stage2;
