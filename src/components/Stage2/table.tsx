import React, { Component } from 'react';
import style from './style.module.css';
import { getIndexes } from './helper';
import Cell from './cell';

// https://www.kodbiro.com/blog/rorgchart-react-module-for-displaying-and-editing-data-in-org-chart/

interface Stage2 extends Component {
  elements?: ICell[][];
}
export interface ICell {
  name: string;
}
const template: ICell[][] = [
  [
    { name: '0-1' },
    { name: '0-2' },
    { name: '0-3' },
    { name: '0-4' },
    { name: '0-5' },
    { name: '0-6' },
    { name: '0-7' },
    { name: '0-8' },
    { name: '0-9' },
    { name: '0-10' },
    { name: '0-11' },
    { name: '0-12' },
    { name: '0-13' },
    { name: '0-14' },
    { name: '0-15' },
    { name: '0-16' },
  ],
  [
    { name: '1-1' },
    { name: '1-2' },
    { name: '1-3' },
    { name: '1-4' },
    { name: '1-5' },
    { name: '1-6' },
    { name: '1-7' },
    { name: '1-8' },
  ],
  [{ name: '2-1' }, { name: '2-2' }, { name: '2-3' }, { name: '2-4' }],
  [{ name: '3-1' }, { name: '3-2' }],
  [{ name: '4-1' }],
];

const emptyCell: ICell = {
  name: '',
};
const Stage2: React.FC<Stage2> = ({ elements = template }) => {
  const rowNumber = elements[0].length;
  const colNumber = elements.length;
  const counter = new Array(colNumber).fill(0); // Indice di riga progressivo
  const rows: JSX.Element[] = []; // Conterrà tutte le righe della tabella
  const tdElements: number[] = getIndexes(rowNumber); // Sequenza numero di elementi

  for (let ii = 1; ii <= rowNumber; ii++) {
    const row: JSX.Element[] = [];
    for (let jj = 0; jj < tdElements[ii]; jj++) {
      counter[jj] += 1;
      const cell = elements[jj] ? elements[jj][counter[jj] - 1] : emptyCell;
      row.push(<Cell span={Math.pow(2, jj)} {...cell} />);
    }
    rows.push(<tr>{row}</tr>);
  }
  return (
    <table className={style.table}>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default Stage2;
