import React from 'react';
import style from './style.module.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { DoubleRightIcon, BanIcon } from 'components/core/icons';
import { ICell } from 'models/stage2.model';

interface NodeElement extends ICell {
  span: number;
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    rowIndex: number,
    colIndex: number,
    winner: boolean
  ) => void;
  rowIndex: number;
  colIndex: number;
}

const Cell: React.FC<NodeElement> = ({ onClick, name, winner, span, rowIndex, colIndex, pair }) => (
  <td rowSpan={span} className={rowIndex % 2 === 0 ? [style.cell, style.borderBottom].join(' ') : style.cell}>
    <InputGroup className={style.container}>
      <InputGroup.Prepend>
        <InputGroup.Text>{rowIndex}</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder={'Username' + colIndex}
        defaultValue={pair ? pair.label : name || ''}
        aria-label="Username"
        aria-describedby="Username"
        disabled={colIndex > 1}
      />
      <InputGroup.Append>
        <Button
          className={style.append}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onClick(e, rowIndex, colIndex, !winner)}
        >
          {winner ? <DoubleRightIcon size="lg" color="green" /> : <BanIcon size="1x" color="red" />}
        </Button>
      </InputGroup.Append>
    </InputGroup>
  </td>
);

export default Cell;
