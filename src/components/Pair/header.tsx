import React, { useState, useEffect } from 'react';
import { headerPropsType } from './type';
import { getTournament } from '../Tournament/helper';

import { TournamentModel } from 'components/Tournament/type';

// FIXME: change to tounament name
const TableHeader: React.FC<headerPropsType> = ({ tournametId }: headerPropsType) => {
  const [tournament, setTournament] = useState<TournamentModel | null>();

  useEffect(() => {
    (async () => {
      const result = await getTournament(tournametId);
      setTournament(result);
    })();
  }, [tournametId]);

  return (
    <h3>
      <p>
        <b>
          Torneo "<strong>{tournament?.name.toUpperCase()}</strong>" ( {tournametId} )
        </b>
      </p>
    </h3>
  );
};

export default TableHeader;
