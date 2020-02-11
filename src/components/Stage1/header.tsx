import React from 'react';
import { headerPropsType } from './type';

const tableHeader: React.FC<headerPropsType> = ({ title, saved }: headerPropsType) => {
  const divStyle = {
    color: saved ? '#4feb34' : undefined
  };
  return (
    <h2 style={divStyle}>
      <b>
        Girone - <strong>{title}</strong>
      </b>
    </h2>
  );
};

export default tableHeader;
