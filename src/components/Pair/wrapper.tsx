import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { TournamentSelector } from 'selectors';
import { useSelector } from 'react-redux';
import PairsTable from './table_new';

interface PairsWrapperProps extends RouteComponentProps {}

const PairsWrapper: React.FC<PairsWrapperProps> = (): JSX.Element => {
  const tournament = useSelector(TournamentSelector.getTournament)!;

  return <div>p</div>;
};

export default withRouter(PairsWrapper);
