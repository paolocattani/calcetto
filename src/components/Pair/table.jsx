import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { PairsGenerator } from '../core/utils';
import { columns, cellEditProps } from './helper';

const PairsTable = props => {
  const [pairsList, setPaisList] = useState([]);
  const [rows, setRows] = useState(PairsGenerator());
  const [isLoading, setIsLoading] = useState(false);
  const { id } = props;

  const emptyRow = {
    id: null,
    tid: id ? id : 1,
    pair1: { id: null, alias: '', name: '', surname: '' },
    pair2: { id: null, alias: '', name: '', surname: '' }
  };

  function addRow() {
    setIsLoading(() =>
      (async () => {
        const response = await fetch('/api/pair', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emptyRow)
        });
        const result = await response.json();
        emptyRow.id = result.id;
        setRows(rows => [emptyRow, ...rows]);
        return false;
      })()
    );
  }

  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) =>
      setRows(rows => [{ id: rows.length, 'pair1.alias': '', 'pair2.alias': '' }, ...rows])
  };

  const onSelect = (selectedElement, rowIndex, columnIndex) => {
    setRows(rows =>
      rows.map(rowElement =>
        //if (rowElement.id === rowIndex) console.log('onSelect', rowElement);
        rowElement.id === rowIndex
          ? columnIndex === 1
            ? { id: rowElement.id, pair1: selectedElement, pair2: rowElement.pair2 }
            : { id: rowElement.id, pair1: rowElement.pair1, pair2: selectedElement }
          : rowElement
      )
    );
  };

  console.log(rows);
  return (
    <>
      <Button onClick={addRow}>Aggiungi Coppia</Button>
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
    </>
  );
};

export default PairsTable;
