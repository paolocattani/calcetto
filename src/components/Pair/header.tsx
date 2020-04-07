import React from 'react';
import { headerPropsType } from './type';
import { translateTournamentProgress } from '../core/utils';

const TableHeader: React.FC<headerPropsType> = ({ tournament }: headerPropsType) => {
  return tournament ? (
    <h3>
      <p>
        <b>
          "<strong>{tournament?.name.toUpperCase()}</strong>"
          <small> @ {translateTournamentProgress(tournament!.progress)}</small>
        </b>
      </p>
    </h3>
  ) : null;
};

export default TableHeader;
