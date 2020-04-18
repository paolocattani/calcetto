import React from 'react';
import style from './style.module.css';
import { getIndexes, template, emptyCell } from './helper';
import Cell from './cell';
import { getBaseLog } from 'components/core/utils';
import { IStage2, ICell } from './types';

// https://www.kodbiro.com/blog/rorgchart-react-module-for-displaying-and-editing-data-in-org-chart/

const Stage2: React.FC<IStage2> = ({ elements = template }) => {
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
  // Sequenza numero di elementi da aggiungere alla riga
  const index: number[] = getIndexes(rowNumber);

  for (let ii = 1; ii <= rowNumber; ii++) {
    const row: JSX.Element[] = [];
    for (let jj = 0; jj < index[ii]; jj++) {
      counter[jj] += 1;
      const cell = elements[jj] ? elements[jj][counter[jj] - 1] : emptyCell;
      row.push(
        <Cell key={`cell : ${jj}-${counter[jj] - 1}`} span={Math.pow(2, jj)} colIndex={counter[jj]} {...cell} />
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
