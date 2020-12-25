import React from 'react';
import style from './style.module.css';
import { getIndexes, getEmptyCell, onClickCallback, onSelectCallback } from './helper';
import Cell from './cell';
import { getBaseLog } from '../../@common/utils/math.utils';
import PairsSelect from '../Pair/select';
import { Styles } from 'react-select';
import { PairDTO, ICell } from '../../@common/dto';
import { useSelector } from 'react-redux';
import { AuthSelector } from 'src/redux/selectors';
// import { valueFormatter } from 'components/Pair/helper';

// https://www.kodbiro.com/blog/rorgchart-react-module-for-displaying-and-editing-data-in-org-chart/

interface Stage2Props {
  pairsSelect: PairDTO[];
  elements: ICell[][];
  rowNumber: number;
  onClick: onClickCallback;
  onSelectPair: onSelectCallback;
}

const Stage2: React.FC<Stage2Props> = ({ onClick, elements, pairsSelect, rowNumber = 64, onSelectPair }) => {
  /*
   * Calcolo il numero di colonne in funzione del numero di righe
   * in quanto l'oggetto che ricevo protrebbe essere solo un parziale
   */
  const colNumber = getBaseLog(2, rowNumber) + 1;
  const bRows = getTableBodyRows(elements, rowNumber, colNumber, onClick, pairsSelect, onSelectPair);
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
      <td
        key={`header ${ii}`}
        className={style.headerCell}
        style={{
          width: `${100 / colNumber}%`,
        }}
      >
        <strong>{`Stage-${ii}`}</strong>
      </td>
    );
  }
  return tds;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function getTableBodyRows(
  elements: ICell[][],
  rowNumber: number,
  colNumber: number,
  onClick: onClickCallback,
  pairsSelect: PairDTO[],
  onSelectPair: onSelectCallback
): JSX.Element[] {
  // Conterrà tutte le righe della tabella
  const rows: JSX.Element[] = [];
  // Indice di riga progressivo
  const counter = new Array<number>(colNumber).fill(0);
  // Sequenza numero di elementi da aggiungere alla riga
  const index: number[] = getIndexes(rowNumber);

  const renderCustomComponent = (rowIndex: number, colIndex: number, isLast: boolean, pair?: PairDTO) => {
    const styles: Partial<Styles> = {
      container: (provided) => ({
        ...provided,
        flex: '1 1 auto',
      }),
      option: (provided) => ({ ...provided, zIndex: 6 }),
      menuList: (provided) => ({
        ...provided,
        flex: '1 1 auto',
        zIndex: 5,
        height: 'auto',
      }),
    };
    const getOptionLabel = (option: PairDTO) =>
      option.id
        ? `${option.placement}${option.stage1Name} : ${
            option.alias ? option.alias : `${option.player1?.name} - ${option.player2?.name} `
          }`
        : '-';
    /* TODO:
    const CustomOption = ({ innerRef, innerProps, data }: OptionProps<PairDTO>) => (
      <div ref={innerRef} {...innerProps}>
        {data.placement}
      </div>
    );
    */
    console.log('Render stage2 select :', rowIndex, colIndex, isLast, pair);
    return (
      <PairsSelect
        //components={{ Option: CustomOption }}
        styles={styles}
        defaultValue={pair}
        options={pairsSelect}
        rowIndex={rowIndex}
        onChange={onSelectPair}
        getOptionLabel={getOptionLabel}
      />
    );
  };

  for (let ii = 1; ii <= rowNumber; ii++) {
    const row: JSX.Element[] = [];
    for (let jj = 0; jj < index[ii]; jj++) {
      counter[jj] += 1;
      const cell = elements[jj] ? elements[jj][counter[jj] - 1] : getEmptyCell();
      row.push(
        <Cell
          renderCustomComponent={jj === 0 ? renderCustomComponent : undefined}
          key={`cell : ${jj}-${counter[jj] - 1}`}
          span={Math.pow(2, jj)}
          rowIndex={counter[jj]}
          colIndex={jj + 1}
          onClick={onClick}
          buttonDisabled={isButtonDisabled(counter[jj], jj, elements)}
          isLast={elements[jj].length === 1}
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

/*
  Il button per impostare la coppia vincente è abilitato solo se entrambe le cell hanno una coppia assegnata
*/
const isButtonDisabled = (rowIndex: number, colIndex: number, elements: ICell[][]) =>
  (elements[colIndex] && elements[colIndex].length === 1) ||
  (rowIndex % 2 !== 0
    ? !elements[colIndex][rowIndex - 1].pair || (elements[colIndex][rowIndex] && !elements[colIndex][rowIndex].pair)
    : !elements[colIndex][rowIndex - 1].pair ||
      (elements[colIndex][rowIndex - 2] && !elements[colIndex][rowIndex - 2].pair));
