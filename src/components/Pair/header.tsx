import React, { useState, useEffect } from 'react';
import { headerPropsType } from './type';

const TableHeader: React.FC<headerPropsType> = ({ tournament }: headerPropsType) => {
  return tournament ? (
    <h3>
      <p>
        <b>
          Torneo "<strong>{tournament?.name.toUpperCase()}</strong>" ( {tournament?.id} )
        </b>
      </p>
    </h3>
  ) : null;
};

export default TableHeader;
