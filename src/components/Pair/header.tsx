import React from 'react';
import { translateTournamentProgress } from '../core/utils';
import { useSelector } from 'react-redux';
import { TournamentSelector } from 'redux/selectors/tournament.selector';

const TableHeader: React.FC<{}> = () => {
  const tournament = useSelector(TournamentSelector.getTournament);
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
