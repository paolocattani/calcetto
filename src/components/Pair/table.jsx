import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { PairsGenerator } from '../core/utils';
import { Button } from 'react-bootstrap';
import { columns, cellEditProps } from './helper';

const PairsTable = props => {
  const [pairsList, setPaisList] = useState([]);
  const [rows, setRows] = useState(PairsGenerator());

  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) =>
      setRows(rows => [{ id: rows.length, 'pair1.alias': '', 'pair2.alias': '' }, ...rows])
  };

  const onSelect = e => {
    console.log('Pairs table ', e);
  };

  return (
    <BootstrapTable
      bootstrap4
      keyField="id"
      data={rows}
      columns={columns(onSelect)}
      rowEvents={rowEvents}
      cellEdit={cellEditProps}
      noDataIndication="Nessun dato reperito"
      striped
      hover
    />
  );
};

export default PairsTable;
