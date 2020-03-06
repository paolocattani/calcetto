import React from 'react';
import { headerPropsType } from './type';

const TableHeader: React.FC<headerPropsType> = ({ tournament }: headerPropsType) => {
  return tournament ? (
    <h3>
      <p>
        <b>
          Torneo "<strong>{tournament?.name.toUpperCase()}</strong>" ( {tournament?.id} )
          <small> - {tournament?.progress}</small>
        </b>
      </p>
    </h3>
  ) : null;
};

export default TableHeader;
