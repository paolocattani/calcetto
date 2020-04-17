import React from 'react';

interface NodeElement {
  name: string;
  span: number;
}

const Cell: React.FC<NodeElement> = ({ name, span }) => (
  <td rowSpan={span} className="node-box">
    <div>{name}</div>
  </td>
);

export default Cell;
