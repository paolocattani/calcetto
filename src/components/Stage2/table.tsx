import React, { Component } from 'react';
import './style.css';
import { getIndexes } from './helper';
import Node from './node';
import { number } from 'yup';
// https://www.kodbiro.com/blog/rorgchart-react-module-for-displaying-and-editing-data-in-org-chart/

interface Stage2 extends Component {
  elements?: ICell[];
}
interface ICell {
  level: {
    name: string;
  };
}
const ddd: any = [
  [
    '0-1',
    '0-2',
    '0-3',
    '0-4',
    '0-5',
    '0-6',
    '0-7',
    '0-8',
    '0-9',
    '0-10',
    '0-11',
    '0-12',
    '0-13',
    '0-14',
    '0-15',
    '0-16',
  ],
  ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '1-8'],
  ['2-1', '2-2', '2-3', '2-4'],
  ['3-1', '3-2'],
  ['4-1'],
];

const Stage2: React.FC<Stage2> = ({ elements = ddd }) => {
  const rowNumber = elements[0].length;
  const colNumber = elements.length;
  const counter = new Array(colNumber).fill(0); // Indice di riga progressivo
  const rows: JSX.Element[] = []; // Conterrà tutte le righe della tabella
  const tdElements: number[] = getIndexes(rowNumber); // Sequenza numero di elementi

  for (let ii = 1; ii <= rowNumber; ii++) {
    const row: JSX.Element[] = [];
    for (let jj = 0; jj < tdElements[ii]; jj++) {
      counter[jj] += 1;
      row.push(<Node span={Math.pow(2, jj)} name={elements[jj][counter[jj] - 1]} />);
    }
    rows.push(<tr>{row}</tr>);
  }
  return (
    <table className="stage2-table">
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Stage2;
