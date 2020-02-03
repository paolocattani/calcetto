import React, { useState } from 'react';
import { useParams } from 'react-router';
import BootstrapTable from 'react-bootstrap-table-next';
import { columns, rowsGenerator, cellEditProps } from './helper';

const TABLE_LENGTH = 10;
const Stage1Table = props => {
  const { tId } = useParams();
  const [rows, setRows] = useState(rowsGenerator(TABLE_LENGTH, TABLE_LENGTH));

  const onSelect = () => {
    console.log('onSelect ');
  };
  console.log('Stage1Table render : rows -> ', rows);
  console.log('Stage1Table render : rows -> ', columns(onSelect, TABLE_LENGTH));
  return (
    <>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={rows}
        columns={columns(onSelect, TABLE_LENGTH)}
        cellEdit={cellEditProps}
        noDataIndication="Nessun dato reperito"
        wrapperClasses="player-table"
        headerClasses="player-table-header"
        caption={<h2>Nome torneo</h2>}
        striped
        hover
      />
    </>
  );
};

export default Stage1Table;
