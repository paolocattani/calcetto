import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { columns, rowsGenerator, cellEditProps } from './helper';
import TableHeader from './header';
import './style.css';

const TABLE_LENGTH = 8;
const Stage1Table = props => {
  const { tId, pairsList } = props;
  const [rows, setRows] = useState(rowsGenerator(TABLE_LENGTH, pairsList));
  const tableName = pairsList[0]?.stage1Name ?? 'Not found';

  const onSelect = () => {
    console.log('onSelect ');
  };

  console.log('render table : ', rows);
  if (rows.length > 0) {
    let rowIndex = 3;
    let colIndex = 1;
    rows[rowIndex][`col${colIndex}`] = 3;
  }
  return pairsList ? (
    <>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={rows}
        columns={columns(onSelect, pairsList)}
        cellEdit={cellEditProps}
        noDataIndication="Nessun dato reperito"
        wrapperClasses="player-table"
        headerClasses="player-table-header"
        caption={<TableHeader title={tableName} />}
        striped
        hover
      />
    </>
  ) : null;
};

export default Stage1Table;
