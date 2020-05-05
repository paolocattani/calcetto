import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TournamentSelector } from 'selectors';
import { useSelector, connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import TableHeader from './header';
import { PairDTO, PlayerDTO } from 'models';
import NoData from './noData';

interface PairsTableProps extends RouteComponentProps {
  pairs: PairDTO[];
  players: PlayerDTO[];
}

const PairsTable: React.FC<PairsTableProps> = ({ pairs }): JSX.Element => {
  //const tournament = useSelector(TournamentSelector.getTournament)!;

  return <div>p</div>;
  /*(
    <BootstrapTable
      bootstrap4
      keyField="id"
      data={pairs}
      columns={columns(onSelect, players) as any}
      cellEdit={cellEditProps(isEditable) as any}
      selectRow={selectRow}
      noDataIndication={() => <NoData isEditable={true} addRow={() => addRow()} optionsLength={players.length} />}
      caption={<TableHeader />}
      headerClasses="default-background default-color-yellow"
      striped
      hover
    />
  );*/
};

export default connect(PairsTable);
