import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { columns, rowsGenerator, cellEditProps } from './helper';
import TableHeader from './header';

const TABLE_LENGTH = 8;
const Stage1Table = props => {
  const { tId, pairsList } = props;
  const [rows, setRows] = useState(rowsGenerator(TABLE_LENGTH, TABLE_LENGTH));
  const tableName = pairsList[0]?.stage1Name ?? 'Not found';

  const onSelect = () => {
    console.log('onSelect ');
  };

  console.log('render table : ', tableName, pairsList);
  return (
    <>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={rows}
        columns={columns(onSelect, tId, TABLE_LENGTH)}
        cellEdit={cellEditProps}
        noDataIndication="Nessun dato reperito"
        wrapperClasses="player-table"
        headerClasses="player-table-header"
        caption={<TableHeader title={tableName} />}
        striped
        hover
      />
    </>
  );
};

export default Stage1Table;
