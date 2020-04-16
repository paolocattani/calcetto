import React from 'react';

interface NodeElement {
  name: string;
  span: number;
}

const Node: React.FC<NodeElement> = ({ name, span }) => (
  <td rowSpan={span} className="node-box">
    <div>{name}</div>
  </td>
);

export default Node;
