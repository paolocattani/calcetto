import React, { Component } from 'react';
import style from './style.module.css';
import { getIndexes } from './helper';
import Cell from './cell';
import { getBaseLog } from 'components/core/utils';

// https://www.kodbiro.com/blog/rorgchart-react-module-for-displaying-and-editing-data-in-org-chart/

interface Stage2 extends Component {
  elements?: ICell[][];
}
export interface ICell {
  name: string;
  winner: boolean;
}
const template: ICell[][] = [
  [
    { name: '0-1', winner: true },
    { name: '0-2', winner: false },
    { name: '0-3', winner: false },
    { name: '0-4', winner: false },
    { name: '0-5', winner: true },
    { name: '0-6', winner: false },
    { name: '0-7', winner: false },
    { name: '0-8', winner: false },
    { name: '0-9', winner: false },
    { name: '0-10', winner: false },
    { name: '0-11', winner: false },
    { name: '0-12', winner: false },
    { name: '0-13', winner: true },
    { name: '0-14', winner: false },
    { name: '0-15', winner: false },
    { name: '0-16', winner: false },
  ],
  [
    { name: '1-1', winner: false },
    { name: '1-2', winner: false },
    { name: '1-3', winner: false },
    { name: '1-4', winner: false },
    { name: '1-5', winner: true },
    { name: '1-6', winner: false },
    { name: '1-7', winner: false },
    { name: '1-8', winner: false },
  ],
  [
    { name: '2-1', winner: false },
    { name: '2-2', winner: true },
    { name: '2-3', winner: false },
    { name: '2-4', winner: false },
  ],
  [
    { name: '3-1', winner: false },
    { name: '3-2', winner: false },
  ],
  [{ name: '4-1', winner: false }],
];

const emptyCell: ICell = {
  name: '',
  winner: false,
};
const Stage2: React.FC<Stage2> = ({ elements = template }) => {
  const rowNumber = elements[0].length;
  /*
   * Calcolo il numero di colonne in funzione del numero di righe
   * in quanto l'oggetto che ricevo protrebbe essere solo un parziale
   */
  const colNumber = getBaseLog(2, rowNumber) + 1;
  const bRows = getTableBodyRows(elements, rowNumber, colNumber);
  const hElem = getTableHeaderElements(colNumber);
  return (
    <table className={style.table}>
      <thead>
        <tr>{hElem}</tr>
      </thead>
      <tbody className={style.body}>{bRows}</tbody>
    </table>
  );
};

export default Stage2;

function getTableHeaderElements(colNumber: number): JSX.Element[] {
  const tds: JSX.Element[] = [];
  for (let ii = 1; ii <= colNumber; ii++) {
    tds.push(
      <td key={`header ${ii}`} className={style.headerCell}>
        <strong>{`Stage-${ii}`}</strong>
      </td>
    );
  }
  return tds;
}

function getTableBodyRows(elements: ICell[][], rowNumber: number, colNumber: number): JSX.Element[] {
  // Conterrà tutte le righe della tabella
  const rows: JSX.Element[] = [];
  // Indice di riga progressivo
  const counter = new Array(colNumber).fill(0);
  // Sequenza numero di elementi
  const tdElements: number[] = getIndexes(rowNumber);

  for (let ii = 1; ii <= rowNumber; ii++) {
    const row: JSX.Element[] = [];
    for (let jj = 0; jj < tdElements[ii]; jj++) {
      counter[jj] += 1;
      const cell = elements[jj] ? elements[jj][counter[jj] - 1] : emptyCell;
      row.push(
        <Cell key={`cell : ${jj}-${counter[jj] - 1}`} span={Math.pow(2, jj)} {...cell} colIndex={counter[jj]} />
      );
    }
    rows.push(
      <tr key={`row : ${ii}`} className={style.row}>
        {row}
      </tr>
    );
  }
  return rows;
}
