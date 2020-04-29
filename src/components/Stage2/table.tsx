import React from 'react';
import style from './style.module.css';
import { getIndexes, template, getEmptyCell } from './helper';
import Cell from './cell';
import { getBaseLog } from 'components/core/utils';
import { ICell } from 'models';

// https://www.kodbiro.com/blog/rorgchart-react-module-for-displaying-and-editing-data-in-org-chart/

interface Stage2Props {
  elements?: ICell[][];
  rowNumber: number;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    rowIndex: number,
    colIndex: number,
    winner: boolean
  ) => void;
}

const Stage2: React.FC<Stage2Props> = ({ onClick, elements = template, rowNumber = 16 }) => {
  if (rowNumber % 8 !== 0) {
    console.log(' rowNumerb ', rowNumber);
    console.log(' elements ', elements);

    return <p>Picche</p>;
  }

  if (!onClick) {
    onClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      rowIndex: number,
      colIndex: number,
      winner: boolean
    ) => {
      const element = elements[colIndex - 1][rowIndex - 1];
      console.log('onClick callback Template : ', rowIndex, colIndex, winner);
      console.log('Element  Template: ', element);
    };
  }

  /*
   * Calcolo il numero di colonne in funzione del numero di righe
   * in quanto l'oggetto che ricevo protrebbe essere solo un parziale
   */
  const colNumber = getBaseLog(2, rowNumber) + 1;
  const bRows = getTableBodyRows(elements, rowNumber, colNumber, onClick);
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

function getTableBodyRows(
  elements: ICell[][],
  rowNumber: number,
  colNumber: number,
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    rowIndex: number,
    colIndex: number,
    winner: boolean
  ) => void
): JSX.Element[] {
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
      const cell = elements[jj] ? elements[jj][counter[jj] - 1] : getEmptyCell();
      // console.log('Cell : ', cell);

      row.push(
        <Cell
          key={`cell : ${jj}-${counter[jj] - 1}`}
          span={Math.pow(2, jj)}
          rowIndex={counter[jj]}
          colIndex={jj + 1}
          onClick={onClick}
          {...cell}
        />
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
