import React from 'react';
import style from './style.module.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { DoubleRightIcon, BanIcon, TrophyIcon } from 'components/core/icons';
import { ICell } from 'models/stage2.model';
import { PairDTO } from 'models';

interface NodeElement extends ICell {
  span: number;
  renderCustomComponent?: (rowIndex: number, colIndex: number, isLast: boolean, pair?: PairDTO) => JSX.Element;
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    rowIndex: number,
    colIndex: number,
    winner: boolean
  ) => void;
  rowIndex: number;
  colIndex: number;
  buttonDisabled: boolean;
  isLast: boolean;
}

const Cell: React.FC<NodeElement> = ({
  onClick,
  name,
  winner,
  span,
  rowIndex,
  colIndex,
  pair,
  buttonDisabled,
  isLast,
  renderCustomComponent,
}) => {
  let icon: JSX.Element;
  if (isLast) icon = <TrophyIcon size="lg" color="gold" />;
  else icon = winner ? <DoubleRightIcon size="lg" color="green" /> : <BanIcon size="1x" color="red" />;

  return (
    <td rowSpan={span} className={rowIndex % 2 === 0 ? [style.cell, style.borderBottom].join(' ') : style.cell}>
      <InputGroup className={style.container}>
        <InputGroup.Prepend className={style.prepend}>
          <InputGroup.Text>{rowIndex}</InputGroup.Text>
        </InputGroup.Prepend>
        {renderCustomComponent ? (
          renderCustomComponent(rowIndex, colIndex, isLast, pair)
        ) : (
          <FormControl
            placeholder={'Username' + colIndex}
            value={pair ? `${pair.player1?.name} - ${pair.player2?.name}` : name}
            aria-label="Username"
            aria-describedby="Username"
            readOnly={colIndex > 1}
            size="lg"
          />
        )}
        <InputGroup.Append>
          <Button
            disabled={buttonDisabled}
            className={style.append}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onClick(e, rowIndex, colIndex, !winner)}
          >
            {icon}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </td>
  );
};

export default Cell;
