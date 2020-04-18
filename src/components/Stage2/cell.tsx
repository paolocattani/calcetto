import React from 'react';
import style from './style.module.css';
import { InputGroup, FormControl } from 'react-bootstrap';
import { ICell } from './table';
import { DoubleRightIcon, BanIcon } from 'components/core/Icons';

interface NodeElement extends ICell {
  span: number;
  colIndex: number;
}

const Cell: React.FC<NodeElement> = ({ name, winner, span, colIndex }) => (
  <td rowSpan={span} className={colIndex % 2 === 0 ? [style.cell, style.borderBottom].join(' ') : style.cell}>
    {true ? (
      <InputGroup className={style.container}>
        <InputGroup.Prepend>
          <InputGroup.Text>{colIndex}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
        <InputGroup.Append>
          <InputGroup.Text className={style.append}>
            {winner ? <DoubleRightIcon size="lg" color="green" /> : <BanIcon size="1x" color="red" />}
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    ) : (
      name
    )}
  </td>
);

export default Cell;
