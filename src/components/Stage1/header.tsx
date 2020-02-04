import React from 'react';
import { headerPropsType } from './type';

const tableHeader: React.FC<headerPropsType> = ({ title }: headerPropsType) => {
  return (
    <h2>
      <b>
        <strong>{`Girone - ${title}`}</strong>
      </b>
    </h2>
  );
};

export default tableHeader;
