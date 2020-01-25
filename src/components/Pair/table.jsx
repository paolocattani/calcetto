import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { PairsGenerator } from '../core/utils';
import { columns, cellEditProps, emptyRow } from './helper';

const PairsTable = props => {
  const [pairsList, setPaisList] = useState([]);
  const [rows, setRows] = useState(PairsGenerator());
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: gestire ID torneo
  const { tId } = props;

  /*
    TODO: gestire caricamento dati da DB


  */

  function addRow() {
    setIsLoading(() =>
      (async () => {
        const response = await fetch('/api/pair', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emptyRow(tId ? tId : 1))
        });
        const result = await response.json();
        emptyRow.id = result.id;
        setRows(rows => [emptyRow, ...rows]);
        return false;
      })()
    );
  }

  function deleteRow() {
    setIsLoading(() =>
      (async () => {
        const response = await fetch('/api/pair', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedRows)
        });
        const result = await response.json();
        emptyRow.id = result.id;
        setRows(rows => rows.filter(row => !selectedRows.find(selectedRow => selectedRow.id === row.id)));
        return false;
      })()
    );
  }

  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) =>
      setRows(rows => [{ id: rows.length, 'pair1.alias': '', 'pair2.alias': '' }, ...rows])
  };

  // Aggiorno la colonna con il giocatore selezionato
  const onSelect = (selectedElement, rowIndex, columnIndex) => {
    setRows(rows =>
      rows.map(rowElement =>
        rowElement.id === rowIndex
          ? columnIndex === 1
            ? { id: rowElement.id, pair1: selectedElement, pair2: rowElement.pair2 }
            : { id: rowElement.id, pair1: rowElement.pair1, pair2: selectedElement }
          : rowElement
      )
    );
  };

  const handleSelect = (row, isSelected) => {
    setSelectedRows(selectedRows => {
      const found = selectedRows.find(e => e.id === row.id) ? true : false;
      if (isSelected) {
        return found ? selectedRows : [row, ...selectedRows];
      } else {
        return found ? selectedRows.filter(e => e.id !== row.id) : selectedRows;
      }
    });
  };

  const selectRow = {
    mode: 'checkbox',
    onSelect: handleSelect,
    onSelectAll: (isSelected, rows) => rows.forEach(row => handleSelect(row, isSelected)),
    style: { backgroundColor: '#c8e6c9' }
  };

  console.log('selectedRows : ', selectedRows);
  return (
    <>
      <Button variant="success" onClick={addRow}>
        Aggiungi Coppia
      </Button>
      <Button variant="danger" onClick={deleteRow}>
        Elimina Coppia
      </Button>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={rows}
        columns={columns(onSelect)}
        rowEvents={rowEvents}
        cellEdit={cellEditProps}
        selectRow={selectRow}
        noDataIndication="Nessun dato reperito"
        striped
        hover
      />
    </>
  );
};

export default PairsTable;
