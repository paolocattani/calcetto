import React from 'react';
import { headerPropsType } from './type';

const tableHeader: React.FC<headerPropsType> = ({ title, saved }: headerPropsType) => {
  const divStyle = {
    color: saved ? '#4feb34' : undefined
  };
  return (
    <h3>
      <b style={divStyle}>
        Girone - <strong>{title}</strong>
      </b>
      {saved ? <small> - Salvataggio in corso...</small> : null}
    </h3>
  );
};

export default tableHeader;
