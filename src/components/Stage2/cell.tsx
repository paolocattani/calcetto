import React from 'react';
import style from './style.module.css';

interface NodeElement {
  name: string;
  span: number;
}

const Cell: React.FC<NodeElement> = ({ name, span }) => (
  <td rowSpan={span} className={style.cell}>
    <div>{name}</div>
  </td>
);

export default Cell;
