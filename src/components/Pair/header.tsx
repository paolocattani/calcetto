import React from 'react';
import { headerPropsType } from './type';

// FIXME: change to tounament name
const tableHeader: React.FC<headerPropsType> = ({ tournametId }: headerPropsType) => {
  return (
    <h3>
      <b>
        Torneo - "<strong>{tournametId}</strong>"
      </b>
    </h3>
  );
};

export default tableHeader;
